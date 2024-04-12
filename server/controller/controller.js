import userModel from "../model/model.js";
import otpGenerator from "otp-generator";
import { sendOtp } from "../utils/mailer.js";
import dotenv from "dotenv";
import Jwt from "jsonwebtoken";
import { uploadFileToS3,deleteObjectFromS3 } from "../utils/s3Upload.js";
import adminSubscription from "../model/adminSubscription.js";
import subscriptionModel from "../model/userSubscription.js";
import chatModel from "../model/chatModel.js";
import { stripeChargeCallback } from "../utils/stripe.js";
import Stripe from 'stripe';
import likeModel from "../model/likeModel.js";



dotenv.config();
const stripe = new Stripe(process.env.STRIPESK);

export async function generateOtp(req, res, next) {
  try {
    const { number } = req.body;

    if (!number) {
      return res.status(400).json({
        error: true,
        message: "Phone number is required",
        data: null,
      });
    }
    const generatedOtp = await otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    req.app.locals.OTP = generatedOtp;
    console.log(generatedOtp);
    sendOtp(generatedOtp, number);

    res.status(201).json({error:'false',message:'otp generated successfully',data:{code: generatedOtp}});
  } catch (error) {
    res.status(500).json({
      error: "true",
      message: `something went wrong ${error}`,
      data: null,
    });
  }
}



//verify otp and register number 
export async function register(req, res, next) {
  try {
    const { number, otp } = req.body;
    const storedOTP = req.app.locals.OTP;
    if (storedOTP && parseInt(storedOTP) === parseInt(otp)) {
      const userExist = await userModel.findOne({ number });
      if (!userExist) {
        const user = new userModel({ number: number });
        await user.save();
        console.log("User saved successfully");
        req.app.locals.OTP = null;
        const token = Jwt.sign(
          {
            userid: user._id,
            number: user.number,
          },
          process.env.JWTS,
          // { expiresIn: "90d" }
        );
        return res.status(201).json({
          error: false,
          message: "User registered successfully",
          data: number,
          token,
        });
      }else {
        const token = Jwt.sign(
          {
            userid: userExist._id,
            number: userExist.number,
          },
          process.env.JWTS,
        );
        return res.status(200).json({
          error: false,
          message: "Logged in",
          data: number,
          token,
        });
      }
    } else {
      return res.status(400).json({
        error: true,
        message: "Invalid OTP",
        data: null,
      });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      error: true,
      message: `Something went wrong ${error}`,
      data: null,
    });
  }
}




//update user info
export async function submitDetails(req, res) {
  try {
    const userId = req.user.userid;
    const existingUser = await userModel.findOne({_id:userId});

    if (!existingUser) {
      console.log("user not found");
        res
        .status(404)
        .json({ message: "User not found", data: null, error: true });
    } else {
      const updatedUser = await userModel.findOneAndUpdate(
        { _id: userId },
        { ...req.body },
        { new: true }
      );
        res
        .status(200)
        .json({
          message: "Record updated",
          data: updatedUser,
          error: false,
        });
    }

  } catch (error) {
    console.error("Error during user update:", error);
    res
      .status(500)
      .send({ message: `Internal Server Error ${error}`, error: true });
  }
}

//get userdata
export async function getUser(req, res) {

  try {
    const userId = req.user.userid;
    const user = await userModel.findById(userId);

    const response = {
      userId: user._id,
      ...user._doc,
    };
    if (user) {
      res.status(200).json({
        error: false,
        message: "User details retrieved successfully",
        data: response,
      });
    } else {
      res.status(404).json({
        error: true,
        message: "User not found",
        data: null,
      });
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
      data: null,
    });
  }
}




//multiple
export async function submitDP(req, res) {
  try {
    const userId = req.user.userid;
    const uploadedFiles = req.files;
    const imageFolder =  req.user.userid;

    if (!uploadedFiles || uploadedFiles.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const s3Location = await uploadFileToS3(uploadedFiles[0], imageFolder, 'image_0');

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { [`photoUpload.0`]: s3Location } },
      { new: true }
    );

    return res.status(200).json({
      message: 'File uploaded successfullyy',
      data: { file: uploadedFiles[0], s3Location: s3Location }
    });
  } catch (error) {
    console.error('Error handling file upload:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function submitPhotos(req, res) {
  try {
    const uploadedFiles = req.files;
    const imageFolder = req.user.userid;

    if (!uploadedFiles || uploadedFiles.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const userId = req.user.userid;

    const currentUser = await userModel.findById(userId);
    const newIndex = currentUser.photoUpload && currentUser.photoUpload.length > 0
      ? currentUser.photoUpload.length
      : 0;

    const s3Locations = await Promise.all(
      uploadedFiles.map(async (file, index) => {
        const key = `image_${newIndex + index}`;
        const s3Location = await uploadFileToS3(file, imageFolder, key);
        return s3Location;
      })
    );

    // Update the user with the new images
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { $push: { photoUpload: { $each: s3Locations, $position: newIndex } } },
      { new: true }
    );

    return res.status(200).json({
      message: 'Files uploaded successfully',
      data: { files: uploadedFiles, s3Locations: s3Locations }
    });
  } catch (error) {
    console.error('Error handling file upload:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
export const deletePhoto = async (req,res) => {
  try {
    const userId= req.user.userid;
    let index = parseInt(req.params.index); // Parse index to integer
    index++;
    console.log(index);
    const currentUser = await userModel.findById(userId);
    if (!currentUser) {
      return { error: 'User not found' };
    }
    if (index < 1 || index >= currentUser.photoUpload.length) {
    
      return { error: 'Invalid photo index' };
    }
    const s3Key = currentUser.photoUpload[index];
 
    await deleteObjectFromS3(userId, s3Key); 
    currentUser.photoUpload.splice(index, 1);
    await currentUser.save();
    return { message: 'Photo deleted successfully' };
  } catch (error) {
    return { error: 'Internal server error' };
  }
}

export async function getAllUsers(req, res) {
  try {
    // Get the user ID from the token
    const userId = req.user.userid;


    const users = await userModel.find({
      _id: { $ne: userId },
      firstName: { $exists: true, $ne:null},
      lastName: { $exists: true, $ne:null}
    });
    
    res.status(200).json({
      error: false,
      message: "User details retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.error('Error retrieving users:', error);
    
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
      data: null,
    });
  }
}




export async function getUserById(req, res) {
  try {
    const userId = req.params.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
        data: null,
      });
    }

    res.status(200).json({
      error: false,
      message: "User details retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error('Error retrieving user by ID:', error);

    res.status(500).json({
      error: true,
      message: "Internal Server Error",
      data: null,
    });
  }
}

export async function getPlan(req, res) {
  try {
    const userId = req.user.userid;
    if (userId) {
      const Normal = await adminSubscription.find({ Type: "Normal" });
      const Premium = await adminSubscription.find({ Type: "Premium" });
      res.status(200).json({
        error: false,
        message: "Plans retrieved successfully",
        Normal,
        Premium,
      });
    }
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
      data: null,
    });
  }
}


export async function createSubscription(req, res) {
  try {
    const userId = req.user.userid; 
    
    const { amount, email, token, features, period ,Type} = req.body;
    const customer = await stripe.customers.create({
      email: email,
      source: token.id
    });
   
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'inr',
      customer: customer.id
    });

    try {
      const { id } = paymentIntent;
      let expDate = new Date(); 
      if (period === 'monthly') {
        expDate.setMonth(expDate.getMonth() + 1); 
      } else if (period === 'weekly') {
        expDate.setDate(expDate.getDate() + 7); 
      } else if (period === 'yearly') {
        expDate.setDate(expDate.getDate() + 364); 
      }

      // Create subscription record with userId
      await subscriptionModel.create({ userId: userId, subscriptionId: id, Features: features, expiryDate: expDate,subscriptionType:Type });
    } catch (error) {
      console.error('Error storing subscription:', error);
    }

    stripeChargeCallback(res)(null, paymentIntent); 
  } catch (error) {
    console.error('Error creating subscription:', error);

    stripeChargeCallback(res)(error); 
  }
}

export async function getSubscription(req, res) {
  const userId  = req.user.userid; 
  try {
    const user = await subscriptionModel.findOne({ userId:userId});

    if (user==null) {
      return res.status(201).json({ error: 'User not found' });
    }
    const currentDate = new Date();
    if (user.userId === userId && new Date(user.expiryDate) > currentDate) {
      return res.status(200).json({ subscription: user });
    } else {
      return res.status(400).json({ error: 'Subscription expired or invalid userId' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}


export async function sendMessage(req, res) {
  const { senderId, receiverId, message, time } = req.body;

  try {
    const chatExists = await chatModel.exists({
      $or: [
        { senderId: senderId, $or: [{ receiverId: senderId }, { receiverId: receiverId }] },
        { senderId: receiverId, $or: [{ receiverId: senderId }, { receiverId: receiverId }] }
      ]
    });

    if (!chatExists) {
      const newChat = new chatModel({
        senderId: senderId,
        receiverId: receiverId,
        chat: [{ senderId: senderId, receiverId: receiverId, message: message, messageTime: time}]
      });
      await newChat.save();
    } else {
      await chatModel.updateOne(
        { 
          $or: [
            { senderId: senderId, receiverId: receiverId },
            { senderId: receiverId, receiverId: senderId }
          ]
        },
        { $push: { chat: { senderId: senderId, receiverId: receiverId, message: message, messageTime: time } } }
      );
    }
    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  } 
}
export async function getMessages(req, res) {
  const  userId = req.user.userid; 
  const friendId= req.params.friendId;
  try {
    const chats = await chatModel.find({
      senderId:userId,
      receiverId:friendId
    });
  const messages = chats.map(chat => {
    const receivedMessages = chat.chat.filter(message =>message.receiverId === userId);
    const sentMessages = chat.chat.filter(message => message.senderId === userId);
      return {
        chatId: chat._id,
        senderId: chat.senderId,
        receiverId: chat.receiverId,
        sentMessages,
        receivedMessages
      };
    });
    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error('Error getting messages:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
export async function sendLike(req, res) {
  const  senderId  = req.user.userid; 
  const receiverId= req.params.friendId;

  console.log('dsaf', receiverId,senderId )
  try {
    // Check if a document exists with the given senderId and receiverId
    const existingLike = await likeModel.findOne({ senderId, receiverId });

    if (existingLike) {
      existingLike.liked = !existingLike.liked;
      await existingLike.save();
    } else {

      const newLike = new likeModel({
        senderId,
        receiverId,
        liked: true
      });
      await newLike.save();
    }
   console.log('ok')
    return res.status(200).json({ success: true, message: 'Liked successfully.' });
  } catch (error) {
    console.error('Error in like', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }  
}
export async function getLike(req, res) {
  const senderId = req.user.userid;
  const receiverId = req.params.friendId;

  try {
    // Find the document with the given senderId and receiverId
    const like = await likeModel.findOne({ senderId, receiverId });

    if (like) {
      // If the document exists, return the liked field value
      return res.status(200).json({ success: true, liked: like.liked });
    } else {
      // If the document does not exist, return false
      return res.status(200).json({ success: true, liked: false });
    }
  } catch (error) {
    console.error('Error getting like:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}



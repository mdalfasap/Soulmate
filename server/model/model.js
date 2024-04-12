import mongoose from "mongoose";

export const userSchema=new mongoose.Schema({
    number:{
        type:Number,
        required:[true,'please Enter Your Number'],
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
    },
    gender:{
        type:String
    },
    nickName:{
        type:String
    },
    dateOfBirth:{
        type:Date
    },
    height:{
        type:Number
    },
    religion:{
        type:String
    },
    relationshipStatus:{
        type:String
    },
    smokingHabbit:{
        type:String
    },
    drinkingHabbit:{
        type:String
    },
    education:{
        type:String
    },
    describeYourself:{
        type:[String]
    },
    language:{
        type:String
    },
    schoolName:{
        type:String
    }, 
    graduationYear:{
        type:Number
    }, 
    courseName:{
        type:String
    },
    fieldOfStudy:{
        type:String
    },
    companyName:{
        type:String
    },
    jobTitle:{
        type:String
    },
    workEmail:{
        type:String
    },
    workAddress:{
        type:String
    },
    yourInterest:{
        type:[String]
    },
    houseNo:{
        type:String
    },
    streetName:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    postalCode:{
        type:Number
    },
    country:{
        type:String
    },
    interestedIn:{
        type:String
    },
    experience:{
        type:Number
    },
    bio:{
        type:String
      },
    photoUpload: {
        type: [String],
        default: [],
      },
      blocked: {
        type: Boolean,
        default: false,
      },
    
})
    export default mongoose.model.userModel || mongoose.model('userModel',userSchema) 
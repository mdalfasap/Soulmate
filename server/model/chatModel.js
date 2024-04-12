import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String
    },

    chat: [
        {
          senderId: String,
          receiverId: String,
          message:String,
          messageTime:Date
        }]
});

export default mongoose.model.chatModel || mongoose.model('chatModel', chatSchema);

import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    subscriptionType: {
        type: String
    },
    subscriptionId: {
        type: String
    },

    Features: [
        {
          title: String,
          limit: String,
        }],
    expiryDate: {
        type: Date,
        required:true
    }
});

export default mongoose.model.subscriptionModel || mongoose.model('subscriptionModel', subscriptionSchema);

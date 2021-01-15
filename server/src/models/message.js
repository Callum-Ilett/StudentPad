import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.ObjectId },
    recipient: { type: mongoose.ObjectId },
    message: { type: String },
  },

  { timestamps: { createdAt: "created_at" } }
);

const Message = mongoose.model("Message", messagesSchema);

export default Message;

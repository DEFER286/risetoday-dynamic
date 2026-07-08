import mongoose, { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    name: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = models.Message || model("Message", MessageSchema);

export default Message;


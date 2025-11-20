import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String, // sender's name or ID
      required: true,
    },
    email: {
      type: String, // sender's email
      required: true,
    },
    phone : {
      type: String, // the message text
      required: true,
    },
    content: {
      type: String, // the message text
      required: true,
    },
    service : {
        type: String, // the message text
        required: true,
    },

    status: {
      type: String, 
      enum: ["pending", "in-progress", "resolved", "completed", "cencel"], // 🔥 add clear statuses
      default: "pending",
    },
    isRead: {
      type: Boolean, // whether the message has been read
      default: false,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

// Export the model
export const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

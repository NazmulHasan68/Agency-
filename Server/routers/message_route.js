import express from "express";
import {
  createMessage,
  getMessages,
  getMessageById,
  updateMessageStatus,
  deleteMessage,
} from "../controllers/message_controller.js";

const router = express.Router();

// ✅ Create new message
router.post("/", createMessage);

// ✅ Get all messages
router.get("/", getMessages);

// ✅ Get single message by ID
router.get("/:id", getMessageById);

// ✅ Update message status (e.g., mark as "read")
router.patch("/:id/status", updateMessageStatus);

// ✅ Delete message
router.delete("/:id", deleteMessage);

export default router;

import { Message } from "../models/message_model.js";

// ✅ Create a new message
// ✅ Create a new message
export const createMessage = async (req, res) => {
  try {
    const { name, email, phone, message, service } = req.body; // include phone

    console.log(name, email, phone, message, service);

    if (!name || !email || !phone || !message || !service) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = await Message.create({
      name,
      email,
      phone,
      content: message,
      service,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error); // log the full error to server console
    res.status(500).json({ 
      message: "Failed to create message", 
      error: error.message || error 
    });
  }
};

// ✅ Get all messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error });
  }
};

// ✅ Get single message by ID
export const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch message", error });
  }
};

// ✅ Update message status (e.g., mark as "read")
export const updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body; // e.g. "read", "unread", "pending"
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status", error });
  }
};

// ✅ Delete message
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete message", error });
  }
};

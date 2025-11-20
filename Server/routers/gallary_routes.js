import express from "express";
import { createGallery, getGallery, getGalleryById, deleteGallery } from "../controllers/gallary_controller.js";
import { upload } from "../utills/multer.js";

const router = express.Router();

// upload.single → একটাই photo field
router.post("/", upload.single("photo"), createGallery);  // Add gallery item
router.get("/", getGallery);                             // Get all gallery items
router.get("/:id", getGalleryById);                      // Get single gallery item
router.delete("/:id", deleteGallery);                    // Delete gallery item

export default router;

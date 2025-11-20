import express from "express";
import { createReview, getReviews, getReviewById, deleteReview } from "../controllers/Review_controller.js";
import { upload } from "../utills/multer.js";
const router = express.Router();

router.post("/", upload.fields([
  { name: "photo", maxCount: 1 },
]), createReview);                      // Add review
router.get("/", getReviews);           // Get all reviews
router.get("/:id", getReviewById);    // Get single review
router.delete("/:id", deleteReview); // Delete review

export default router;



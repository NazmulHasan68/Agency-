import { Review } from "../models/review_model.js";
import { deleteFile } from "../utills/deleteFile.js";


// Create new review
export const createReview = async (req, res) => {
  try {
    const photoPath = req.files?.photo ? `/uploads/${req.files.photo[0].filename}` : null;

    const review = new Review({
      name: req.body.name,
      title: req.body.title,
      comment: req.body.comment,
      photo: photoPath,
      media: req.body.media,
    });

    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single review
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete review (with file delete)
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // delete files if exist
    if (review.photo) deleteFile(review.photo);

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

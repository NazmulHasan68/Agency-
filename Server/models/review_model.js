import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: Number, required: true, },
    photo: { type: String, required: true,  },
    comment: { type: String, required: true,  },
    media : { type: String, required: true,  },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);

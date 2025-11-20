import mongoose from "mongoose";

const impactSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
      default: 0,
    },
    icon: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Impact = mongoose.model("Impact", impactSchema);

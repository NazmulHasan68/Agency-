import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true,},
    photo: { type: String, required: true }, // public/uploads/... এ path রাখবেন
  },
  { timestamps: true }
);

export const Gallery = mongoose.model("Gallery", gallerySchema);


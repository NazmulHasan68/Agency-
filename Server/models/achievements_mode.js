import mongoose from "mongoose";

const achievementsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    type: {
      type: String, // e.g., "Award", "Certification", "Milestone"
    },
    logo: {
      type: String, // Optional image URL for certificate/photo
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Achievements =
  mongoose.models.Achievements || mongoose.model("Achievements", achievementsSchema);

import mongoose from "mongoose";

const journeySchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    subtitle: {
      type: String, 
      required: true 
    },
    link: {
      type: String, // URL or external link
      default: ""
    },
    date: {
      type: Date, // Date of the journey/milestone
      default: Date.now
    },
    isActive: {
      type: Boolean, // To enable/disable a milestone
      default: true
    }
  },
  { timestamps: true }
);

export const Journey = mongoose.models.Journey || mongoose.model("Journey", journeySchema);

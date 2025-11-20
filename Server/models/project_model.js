import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    projectPhoto: {
      type: String, // URL or path to main project image
      required: true,
    },
    gallery: {
      type: [String], // Array of image URLs for multiple photos
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    projectLink: {
      type: String, // Link to live project or demo
    },
    clientName: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    technologies: {
      type: [String], // Array of technologies/tools used
      default: [],
    },

  },
  { timestamps: true }
);

export const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

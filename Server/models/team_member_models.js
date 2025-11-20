import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },  
    dept: { type: String, required: true },          // Department or team
    role: { type: String, required: true },          // Job role / title
    expertise: { type: [String], default: [] },      // List of expertise areas
    bio: { type: String, default: "" },              // Short introduction
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: "" },

    // 🌍 Social Links
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    github: { type: String, default: "" },
    fiverr: { type: String, default: "" },
    upwork: { type: String, default: "" },
    portfolio: { type: String, default: "" },

    // 🏆 Achievements & Experience
    experienceYears: { type: Number, default: 0 },     // Total years of experience
    achievements: [{ type: String }],                  // Awards, recognitions, etc.
    certifications: [{ type: String }],                // Professional certifications
    education: {
      degree: { type: String, default: "" },
      institution: { type: String, default: "" },
      year: { type: String, default: "" },
    },

    // 📁 Media & Files
    photo: { type: String, default: "" },              // Profile picture URL
    resume: { type: String, default: "" },             // Resume/CV file link
    coverImage: { type: String, default: "" },         // For profile banner

    // 💼 Team & Display
    isActive: { type: Boolean, default: true },        // Show/hide on website
    order: { type: Number, default: 0 },               // Display order
    featured: { type: Boolean, default: false },       // Highlighted on site
    tags: [{ type: String }],                          // Extra labels like "Designer", "Mentor", etc.

    // 🧠 Skills with level
    skills: [
      {
        name: { type: String },
        level: { 
          type: String, 
          enum: ["Beginner", "Intermediate", "Expert"], 
          default: "Beginner" 
        },
      },
    ],


    // 📊 Stats / Insights (optional)
    projectsCompleted: { type: Number, default: 0 },
    rating: { type: Number, default: 0 }, // average rating from clients/team

  },
  { timestamps: true }
);

export const TeamMember =
  mongoose.models.TeamMember || mongoose.model("TeamMember", teamMemberSchema);

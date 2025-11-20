import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
  {
    company: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String 
    },
    phone: { 
      type: String 
    },
    website: { 
      type: String 
    },
    logo: { 
      type: String 
    },
    description: { 
      type: String 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
  },
  { timestamps: true }
);

export const Partner = mongoose.models.Partner || mongoose.model("Partner", partnerSchema);


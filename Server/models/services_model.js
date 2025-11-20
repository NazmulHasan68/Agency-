import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subtitle: { type: String, required: true },
    service : { type: String, required: true }, 
    package: { type: String, required: true }, // Basic, Standard, Premium
    priceAmount: { type: Number, required: true },
    billingCycle: { type: String, enum: ["month", "year"], default: "month" },
    features: { 
      type: [String], 
      required: true, 
    },
    isPopular: { type: Boolean, default: false },
    description: { type: String }, // optional detailed info
  },
  { timestamps: true }
);

export const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);

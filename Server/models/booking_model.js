import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String,  },
    service: { type: String, required: true },
    package: { type: String },
    notes: { type: String },
    Datline: { type: Date },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // links to the User model
    },
    price: { type: Number },
    bookingId: {
      type: String,
      unique: true,
      default: () => `BKG-${Date.now()}`,
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
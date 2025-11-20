import { User } from "../models/authentication_model.js";
import { Booking } from "../models/booking_model.js";
import bcryptjs from "bcryptjs";
import { sendMessage } from "../utills/sendMessage.js";

// ✅ Create Booking
export const createBooking = async (req, res) => {
  try {
    const { phone, name, service, package: planName, price, Dateline } = req.body;

    // Validate essential fields
    if (!phone || !name || !service || !planName || !price) {
      return res.status(400).json({
        success: false,
        message: "Missing required booking fields",
      });
    }

    // Find or create user
    let user = await User.findOne({ phone });
    if (!user) {
      const hashedPassword = await bcryptjs.hash("1234", 10);

      user = await User.create({
        name,
        phone,
        password: hashedPassword,
      });
    }

    // Create booking
    const booking = await Booking.create({
      ...req.body,
      user: user._id, // Optional link between booking and user
      status: "pending",
    });

  const mobileMessage = await sendMessage(
      phone,
      "Dear Customer, this is Wmz Agency. Your booking request has been received. Our representative will contact you shortly. => pass: 1234.  Thank you for your trust."
    );


    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Booking creation failed:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
};



// ✅ Get All Bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

// ✅ Get Single Booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
      error: error.message,
    });
  }
};

// ✅ Update Booking
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
     const book = await Booking.findById(req.params.id);

    const mobileMessage = await sendMessage(
        book.phone,

        `Hi ${book.name || "Customer"}, 👋
        Your booking request for the "${book?.package}" plan under "${book?.service}" service has been received. Total price: Tk. ${book?.price}.

        Current stauts is => " ${book?.status} "... Thank you for choosing us!`
        );

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update booking",
      error: error.message,
    });
  }
};

// ✅ Delete Booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete booking",
      error: error.message,
    });
  }
};

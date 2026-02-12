const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
  {
    // Changed from userId to user to match your routes
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true },
    tableNumber: { type: String }, // Added this to match your Profile UI logic
    status: {
      type: String,
      default: "Confirmed",
      enum: ["Confirmed", "Cancelled", "Completed"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", ReservationSchema);

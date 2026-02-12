const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
  {
    // Requirement #2: Connects reservation to a User in MongoDB Atlas
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { 
      type: Date, 
      required: true 
    },
    time: { 
      type: String, 
      required: true 
    },
    guests: { 
      type: Number, 
      required: true,
      min: [1, "Must have at least 1 guest"]
    },
    tableNumber: { 
      type: String 
    }, 
    // Requirement #7: Helps Admin manage the reservation flow
    status: {
      type: String,
      default: "Confirmed",
      enum: ["Confirmed", "Cancelled", "Completed"],
    },
    // Professional touch: Helpful for Task 7 Admin side
    specialRequests: {
      type: String,
      trim: true
    }
  },
  // Requirement #6: Timestamps allow sorting "My Reservations" by newest first
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", ReservationSchema);

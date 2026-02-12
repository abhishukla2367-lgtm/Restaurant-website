const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation"); // Ensure this model exists
const authMiddleware = require("../middleware/authMiddleware");

// @route   POST /api/reservations
// @desc    Book a table
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { date, time, guests, tableNumber } = req.body;

    const newReservation = new Reservation({
      user: req.user.id,
      date,
      time,
      guests,
      tableNumber,
    });

    const savedRes = await newReservation.save();
    res.status(201).json(savedRes);
  } catch (err) {
    console.error("Reservation Error:", err.message);
    res.status(500).send("Server Error: Could not book table.");
  }
});

// @route   GET /api/reservations/my-reservations
// @desc    Get all bookings for the logged-in user
router.get("/my-reservations", authMiddleware, async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id }).sort({ date: 1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;

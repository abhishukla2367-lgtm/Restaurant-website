const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");

// Task 4: Destructured imports to fix the "handler must be a function" error
const { protect, admin } = require("../middleware/protect");

/**
 * @route   POST /api/reservations
 * @desc    Task 7: Book a table and store in MongoDB Atlas (Requirement #2)
 * @access  Private (Login Required - Task 4)
 */
router.post("/", protect, async (req, res) => {
  try {
    const { date, time, guests, tableNumber, specialRequests } = req.body;

    // Requirement: Ensure proper validations for all forms
    if (!date || !time || !guests) {
      return res.status(400).json({ message: "Please provide date, time, and guest count." });
    }

    const newReservation = new Reservation({
      user: req.user.id, // Linked to the logged-in user (Task 4)
      date,
      time,
      guests,
      tableNumber,
      specialRequests
    });

    const savedRes = await newReservation.save();
    res.status(201).json({ message: "Reservation successful!", data: savedRes });
  } catch (err) {
    res.status(500).json({ message: "Server Error: Could not book table.", error: err.message });
  }
});

/**
 * @route   GET /api/reservations/my-reservations
 * @desc    Task 6: Display "My Reservations" on User Profile page
 * @access  Private
 */
router.get("/my-reservations", protect, async (req, res) => {
  try {
    // Professional Detail: Sorting by date to help user plan their visit
    const reservations = await Reservation.find({ user: req.user.id }).sort({ date: 1 });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching your reservations" });
  }
});

/**
 * @route   GET /api/reservations/admin/all
 * @desc    Task 7: Display reservations on Admin side Reservation page
 * @access  Private (Admin only)
 */
router.get("/admin/all", protect, admin, async (req, res) => {
  try {
    // Populate user details so Admin knows who is coming (Requirement #7)
    const allReservations = await Reservation.find()
      .populate("user", "name email phone")
      .sort({ date: 1 });
      
    res.status(200).json(allReservations);
  } catch (err) {
    res.status(500).json({ message: "Admin fetch failed" });
  }
});

module.exports = router;

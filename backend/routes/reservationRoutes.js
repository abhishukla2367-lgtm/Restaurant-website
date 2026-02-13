const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const { protect, admin } = require("../middleware/protect");

// ==========================================
// TASK 7: TABLE RESERVATION (USER SIDE)
// ==========================================
/**
 * @route   POST /api/reservations
 * @desc    Task 4 & 7: Reserve a table (Requires Login)
 * @access  Private
 */
router.post("/", protect, async (req, res) => {
  try {
    const { date, time, guests, tableNumber, specialRequests } = req.body;

    // Guideline: Proper validations
    if (!date || !time || !guests) {
      return res.status(400).json({ 
        success: false, 
        message: "Validation Failed: Date, Time, and Guest count are required." 
      });
    }

    // Task 7: Store reservation in database linked to logged-in user
    const newReservation = new Reservation({
      user: req.user.id, 
      date,
      time,
      guests,
      tableNumber,
      specialRequests
    });

    const savedRes = await newReservation.save();
    res.status(201).json({ 
      success: true, 
      message: "Reservation confirmed successfully!", 
      data: savedRes 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: "Server Error: Could not process reservation.", 
      error: err.message 
    });
  }
});

// ==========================================
// TASK 6: USER PROFILE (MY RESERVATIONS)
// ==========================================
/**
 * @route   GET /api/reservations/my-reservations
 * @desc    Task 6: Display personal reservations on Profile page
 * @access  Private
 */
router.get("/my-reservations", protect, async (req, res) => {
  try {
    // Professional Detail: Fetch only the logged-in user's data
    const reservations = await Reservation.find({ user: req.user.id })
      .sort({ date: -1 }); // Newest first for better UI

    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: "Error retrieving your reservations." 
    });
  }
});

// ==========================================
// TASK 7: ADMIN DASHBOARD (ALL RESERVATIONS)
// ==========================================
/**
 * @route   GET /api/reservations/admin/all
 * @desc    Task 7: Display ALL reservations on Admin side
 * @access  Private (Admin Only)
 */
router.get("/admin/all", protect, admin, async (req, res) => {
  try {
    // Populate user details so Admin knows the customer's name and email
    const allReservations = await Reservation.find()
      .populate("user", "name email") 
      .sort({ date: 1 });
      
    res.status(200).json({
      success: true,
      data: allReservations
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: "Admin Access Error: Could not fetch all reservations." 
    });
  }
});

module.exports = router;

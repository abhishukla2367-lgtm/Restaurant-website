const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");
const Reservation = require("../models/Reservation");

// FIXED: Destructured to prevent TypeError: argument handler must be a function
const { protect } = require("../middleware/protect");

/**
 * @route   GET /api/profile
 * @desc    Task 6: Fetch User Details, My Orders, and My Reservations
 * @access  Private
 */
router.get("/", protect, async (req, res) => {
  try {
    // Parallel fetching for high-performance (Requirement #2)
    const [user, orders, reservations] = await Promise.all([
      // 1. User info (Task 6.1) - Exclude password for security
      User.findById(req.user.id).select("-password"),

      // 2. My Orders (Task 6.2) - Sort by newest
      Order.find({ user: req.user.id }).sort({ createdAt: -1 }),

      // 3. My Reservations (Task 6.2) - Sort by date
      Reservation.find({ user: req.user.id }).sort({ date: 1 })
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return combined object to populate the Profile page UI
    res.status(200).json({
      user,
      orders,
      reservations
    });
  } catch (err) {
    res.status(500).json({ message: "Could not load profile.", error: err.message });
  }
});

/**
 * @route   PUT /api/profile/update
 * @desc    Professional Touch: Allow user to update details
 * @access  Private
 */
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { name, phone, address } },
      { new: true } 
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;

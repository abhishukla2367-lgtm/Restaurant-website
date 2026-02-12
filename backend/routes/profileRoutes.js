const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");
const Reservation = require("../models/Reservation");
const authMiddleware = require("../middleware/authMiddleware");

// @route   GET /api/profile
// @desc    Get complete user profile data (User info + Orders + Reservations)
router.get("/", authMiddleware, async (req, res) => {
  try {
    // 1. Fetch User details (excluding password for security)
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // 2. Fetch Orders belonging to this user
    // Note: We use 'user' here to match your updated Order model
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });

    // 3. Fetch Reservations belonging to this user
    const reservations = await Reservation.find({ user: req.user.id }).sort({ date: 1 });

    // 4. Send combined data to the frontend
    res.json({
      user,
      orders,
      reservations
    });
  } catch (err) {
    console.error("Profile Route Error:", err.message);
    res.status(500).send("Server Error: Could not fetch profile data.");
  }
});

module.exports = router;

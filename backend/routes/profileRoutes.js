const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");
const Reservation = require("../models/Reservation");

// Task 4 & 6: Import the protection middleware
const { protect } = require("../middleware/protect");

/**
 * @route   GET /api/profile
 * @desc    Task 6: Fetch User Details, My Orders, and My Reservations
 * @access  Private
 */
router.get("/", protect, async (req, res) => {
  try {
    // Parallel fetching (Task 6.1 & 6.2)
    const [user, orders, reservations] = await Promise.all([
      // info from User collection (Task 5)
      User.findById(req.user.id).select("-password"),

      // info from Order collection (Task 8)
      Order.find({ user: req.user.id }).sort({ createdAt: -1 }),

      // info from Reservation collection (Task 7)
      Reservation.find({ user: req.user.id }).sort({ date: 1 })
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user, orders, reservations });
  } catch (err) {
    res.status(500).json({ message: "Could not load profile.", error: err.message });
  }
});

/**
 * @route   PUT /api/profile/update
 * @desc    Professional Touch: Update user details (Task 6.1)
 * @access  Private
 */
// FIXED: Changed authMiddleware to protect to match import
router.put("/update", protect, async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { name, phone, address } },
      // new: true returns updated doc; runValidators ensures data is valid
      { new: true, runValidators: true } 
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

module.exports = router;

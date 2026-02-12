const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); 
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @route   POST /api/orders
 * @desc    Place a new food order
 * @access  Private
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    // 1. Validation: Don't allow empty orders
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items found in order." });
    }

    // 2. Create Order
    // Note: req.user.id comes from your verified JWT token
    const newOrder = new Order({
      user: req.user.id, 
      items: items,
      totalAmount: totalAmount,
      status: "Pending" // Match the uppercase "P" in your Order model enum
    });

    const savedOrder = await newOrder.save();
    console.log("✅ Order Saved to Atlas:", savedOrder._id);
    
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("❌ Order Save Error:", err.message);
    res.status(500).json({ message: "Server Error: Could not save order." });
  }
});

/**
 * @route   GET /api/orders/my-orders
 * @desc    Get all orders for the logged-in user
 * @access  Private
 */
router.get("/my-orders", authMiddleware, async (req, res) => {
  try {
    // Finds orders where the 'user' field matches the logged-in user's ID
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Fetch Orders Error:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); 
const Cart = require("../models/Cart"); 

// Task 4: Destructure imports to ensure middleware functions work correctly
const { protect, admin } = require("../middleware/protect");

/**
 * @route   POST /api/orders
 * @desc    Task 8: Place order, store in DB, and CLEAR CART (Task 8.2)
 * @access  Private (Login Required)
 */
router.post("/", protect, async (req, res) => {
  try {
    const { items, totalAmount, deliveryInfo } = req.body;

    // Requirement: Ensure proper validations for all forms
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    // 1. Store order in database (Task 8.1)
    const newOrder = new Order({
      user: req.user.id, // Linked to the logged-in user
      items,
      totalAmount,
      deliveryInfo, 
      status: "Pending" 
    });

    const savedOrder = await newOrder.save();

    // 2. Remove items from cart (Task 8.2 - CRITICAL)
    await Cart.findOneAndDelete({ user: req.user.id }); 
    
    res.status(201).json({ message: "Order placed successfully", order: savedOrder });
  } catch (err) {
    res.status(500).json({ message: "Order failed", error: err.message });
  }
});

/**
 * @route   GET /api/orders/my-orders
 * @desc    Task 6: Display "My Orders" in User Profile page
 * @access  Private
 */
router.get("/my-orders", protect, async (req, res) => {
  try {
    // Professional Detail: Sorting by newest first
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

/**
 * @route   GET /api/orders/admin/all
 * @desc    Task 8.3: Show orders on Admin side Orders page
 * @access  Private (Admin only)
 */
router.get("/admin/all", protect, admin, async (req, res) => {
  try {
    // Populate user details so the Admin can see who placed the order (Requirement #2)
    const allOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
      
    res.status(200).json(allOrders);
  } catch (err) {
    res.status(500).json({ message: "Admin fetch failed" });
  }
});

module.exports = router;

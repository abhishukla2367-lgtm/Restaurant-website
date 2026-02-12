const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart"); // Ensure you have this model
const { protect } = require("../middleware/protect"); // Protect these routes

// @desc    Get current user's cart items
// @route   GET /api/cart
// @access  Private (Task 4)
router.get("/", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching cart" });
  }
});

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private (Task 8)
router.post("/add", protect, async (req, res) => {
  const { productId, name, price, quantity, image } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (cart) {
      // If cart exists, check if item is already in it
      const itemIndex = cart.items.findIndex((p) => p.productId === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, name, price, quantity, image });
      }
      cart = await cart.save();
    } else {
      // If no cart, create a new one for user
      cart = await Cart.create({
        user: req.user.id,
        items: [{ productId, name, price, quantity, image }],
      });
    }
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart" });
  }
});

// @desc    Remove specific item from cart
// @route   DELETE /api/cart/item/:productId
// @access  Private (Task 8: User can delete items)
router.delete("/item/:productId", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      cart.items = cart.items.filter((item) => item.productId !== req.params.productId);
      await cart.save();
      return res.json(cart);
    }
    res.status(404).json({ message: "Cart not found" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" });
  }
});

// @desc    Clear entire cart (Used after placing order)
// @route   DELETE /api/cart/clear
// @access  Private (Task 8: Remove items from cart on order)
router.delete("/clear", protect, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });
    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart" });
  }
});

module.exports = router;

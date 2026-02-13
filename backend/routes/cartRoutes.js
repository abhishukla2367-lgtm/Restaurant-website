const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart"); 
const { protect } = require("../middleware/protect"); 

// @desc    Task 8: Added items should appear in Cart
// @route   GET /api/cart
router.get("/", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    // Professional Detail: Return a valid empty structure if no cart exists
    if (!cart) return res.json({ items: [], totalPrice: 0 });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching cart" });
  }
});

// @desc    Task 8: Store items in database
// @route   POST /api/cart/add
router.post("/add", protect, async (req, res) => {
  const { productId, name, price, quantity, image } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (cart) {
      // FIX: Use .toString() to compare MongoDB ObjectIds accurately
      const itemIndex = cart.items.findIndex((p) => p.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += Number(quantity);
      } else {
        cart.items.push({ productId, name, price, quantity: Number(quantity), image });
      }

      // Professional Detail: Always recalculate total on the backend
      cart.totalPrice = cart.items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
      cart = await cart.save();
    } else {
      cart = await Cart.create({
        user: req.user.id,
        items: [{ productId, name, price, quantity: Number(quantity), image }],
        totalPrice: Number(price) * Number(quantity)
      });
    }
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
});

// @desc    Task 8: User can delete cart items
// @route   DELETE /api/cart/item/:productId
router.delete("/item/:productId", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      // FIX: Use .toString() to ensure the filter actually finds the item
      cart.items = cart.items.filter((item) => item.productId.toString() !== req.params.productId);
      
      // Recalculate price after removal
      cart.totalPrice = cart.items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
      
      await cart.save();
      return res.json(cart);
    }
    res.status(404).json({ message: "Cart not found" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" });
  }
});

// @desc    Task 8.2: Remove items from cart on placing order
// @route   DELETE /api/cart/clear
router.delete("/clear", protect, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });
    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart" });
  }
});

module.exports = router;

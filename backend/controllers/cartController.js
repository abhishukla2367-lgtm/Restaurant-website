const Cart = require("../models/Cart");

// @desc    Task 8: Added items should appear in Cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    // Return empty structure so Frontend doesn't crash on .map()
    if (!cart) return res.json({ items: [], totalBill: 0 });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart data" });
  }
};

// @desc    Task 8: Store items in database
exports.addToCart = async (req, res) => {
  const { productId, name, price, quantity, image } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // FIX: Use .toString() for reliable comparison
      const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += Number(quantity);
      } else {
        cart.items.push({ productId, name, price: Number(price), quantity: Number(quantity), image });
      }
      
      // Recalculate total bill
      cart.totalBill = cart.items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
      await cart.save();
    } else {
      // Create new cart if it doesn't exist
      const totalBill = Number(price) * Number(quantity);
      cart = await Cart.create({
        user: userId,
        items: [{ productId, name, price: Number(price), quantity: Number(quantity), image }],
        totalBill
      });
    }
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to add item to cart", error: error.message });
  }
};

// @desc    Task 8: User can delete cart items
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      // FIX: Use .toString() to ensure the filter works correctly
      cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
      
      // Update bill after removal
      cart.totalBill = cart.items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
      await cart.save();
      return res.json(cart);
    }
    res.status(404).json({ message: "Cart not found" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" });
  }
};

// @desc    Task 8.2: Remove items from cart on placing order
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });
    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Could not clear cart" });
  }
};

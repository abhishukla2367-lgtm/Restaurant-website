const Cart = require("../models/Cart");

// @desc    Get user's cart (Task 8: Added items should appear in Cart)
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    // Task 8: Return empty array if no cart exists yet
    if (!cart) return res.json({ items: [], totalBill: 0 });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart data" });
  }
};

// @desc    Add item to cart (Task 8: Store items in database)
exports.addToCart = async (req, res) => {
  const { productId, name, price, quantity, image } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Logic to update existing cart
      const itemIndex = cart.items.findIndex((p) => p.productId === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, name, price, quantity, image });
      }
      
      cart.totalBill = cart.items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
      await cart.save();
    } else {
      // FIX: Added the missing items value here
      const totalBill = price * quantity;
      cart = await Cart.create({
        user: userId,
        items: [{ productId, name, price, quantity, image }],
        totalBill
      });
    }
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to add item to cart" });
  }
};

// @desc    Remove item (Task 8: User can delete cart items)
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      // Filter out the item and update bill
      cart.items = cart.items.filter((item) => item.productId !== productId);
      cart.totalBill = cart.items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
      await cart.save();
      return res.json(cart);
    }
    res.status(404).json({ message: "Cart not found" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" });
  }
};

// @desc    Clear cart (Task 8: Remove items from cart on placing order)
exports.clearCart = async (req, res) => {
  try {
    // This should be called by the Order Controller after successful placement
    await Cart.findOneAndDelete({ user: req.user.id });
    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Could not clear cart" });
  }
};

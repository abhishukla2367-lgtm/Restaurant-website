const Order = require('../models/Order');
const Cart = require('../models/Cart'); // Required for Task 8.2: Remove items from cart

// @desc    Task 8: Place order, store in DB, and CLEAR CART
// @route   POST /api/orders
exports.placeOrder = async (req, res) => {
    try {
        const { items, totalAmount, deliveryInfo } = req.body;

        // 1. Validation
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cannot place an empty order." });
        }

        // 2. Create Order (Task 8.1)
        const newOrder = await Order.create({
            user: req.user.id, // Populated by authMiddleware
            items,
            totalAmount,
            deliveryInfo, 
            status: "Pending"
        });

        // 3. Clear User Cart (Task 8.2)
        // This ensures the cart is empty for the user's next visit
        await Cart.findOneAndDelete({ user: req.user.id });

        res.status(201).json({
            message: "Order placed successfully!",
            order: newOrder
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// @desc    Task 6: Display My Orders in Profile page
// @route   GET /api/orders/my-orders
exports.getMyOrders = async (req, res) => {
    try {
        // Sort by newest first for a professional UI
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch your orders." });
    }
};

// @desc    Task 8.3: Show orders on Admin side Orders page
// @route   GET /api/orders/admin/all
exports.getAllOrders = async (req, res) => {
    try {
        // Populate helps show the User's name/email instead of just an ID
        const orders = await Order.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch admin order list." });
    }
};

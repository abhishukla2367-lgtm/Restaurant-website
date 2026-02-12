const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    // Requirement #2: Link to User in MongoDB Atlas
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            // Task 8: Added items should appear in Cart
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true, default: 1 },
            // Optional: Link to a Product model if you have one
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product' 
            }
        }
    ],
    // Total price of all items in the cart
    totalPrice: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);

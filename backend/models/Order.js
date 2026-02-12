const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    // Requirement #2 & #6: Connects order to a User in MongoDB Atlas
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a user"],
    },
    // Task 8: Store items from the cart into the database
    items: [
      {
        name: { type: String, required: true },
        quantity: { 
          type: Number, 
          required: true, 
          min: [1, "Quantity cannot be less than 1"] 
        },
        price: { type: Number, required: true },
      },
    ],
    // Professional Detail: Needed for actual food delivery flow
    deliveryInfo: {
      address: { type: String, required: true },
      phone: { type: String, required: true }
    },
    totalAmount: { type: Number, required: true },
    // Task 8.3: Status for Admin side Orders page
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Processing", "Delivered", "Cancelled"],
    },
    paymentStatus: {
      type: String,
      default: "Unpaid",
      enum: ["Unpaid", "Paid"]
    }
  },
  // Requirement #6: Timestamps allow "My Orders" to be sorted by date
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

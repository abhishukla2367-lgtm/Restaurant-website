require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("node:dns");

// Fix for MongoDB DNS issues in some environments
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

// 1. MIDDLEWARE
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // Support for Vite default ports
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json()); // Essential for Task 5 & 8 (Parsing incoming JSON)

// Request Logger (Helpful for debugging Task 4 access)
app.use((req, res, next) => {
  console.log(`📩 [${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 2. DATABASE CONNECTION (Task 2)
// Ensure your MONGO_URI in .env is from MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected successfully."))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Stop server if DB fails
  });

// 3. ROUTE MOUNTING
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes"); 
const reservationRoutes = require("./routes/reservationRoutes");
const cartRoutes = require("./routes/cartRoutes"); // Added for Task 8

// Auth & Profile (Task 5 & 6)
app.use("/api/auth", authRoutes); 

// Orders & Cart (Task 8: Add to cart, Delete, and Place Order)
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes); 

// Table Reservations (Task 7)
app.use("/api/reservations", reservationRoutes);

// 4. GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: "Internal Server Error", 
    error: process.env.NODE_ENV === 'development' ? err.message : {} 
  });
});

// 5. START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
});

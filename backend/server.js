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
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// LOGGING MIDDLEWARE: Check your terminal to see if requests are hitting the server
app.use((req, res, next) => {
  console.log(`📩 Request Received: ${req.method} ${req.url}`);
  next();
});

// 2. ROUTE MOUNTING
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes"); 
const reservationRoutes = require("./routes/reservationRoutes");

// Mounting Points
app.use("/api/auth", authRoutes);             // Task 5 & 6: Auth + Profile (/api/auth/profile)
app.use("/api/orders", orderRoutes);         // Task 6: Saving & Fetching Orders
app.use("/api/reservations", reservationRoutes); // Task 6: Saving & Fetching Bookings

// Health Check Route
app.get("/api/health", (req, res) => res.json({ status: "ok", message: "Server is healthy" }));

// 3. DATABASE CONNECTION (MongoDB Atlas)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected successfully."))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err.message);
  });

// 4. START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
});

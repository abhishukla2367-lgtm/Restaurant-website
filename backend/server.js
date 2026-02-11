require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("node:dns");

// DNS Fix for MongoDB Atlas SRV records
dns.setServers(["8.8.8.8", "1.1.1.1"]); 

const app = express();

// --- MIDDLEWARE ---
app.use(cors({
  origin: [ "http://localhost:5173", 
             "http://localhost:5174"
            ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// --- ROUTES ---
// Make sure this file exists at ./routes/authRoutes.js
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes); 

// --- MONGODB CONNECTION ---
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ Error: MONGO_URI is not defined in .env file");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });

// --- SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

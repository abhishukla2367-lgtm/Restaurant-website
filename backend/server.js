require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]); 

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// --- ROUTES ---
const authRoutes = require("./routes/authRoutes");
// Mounting under /api/auth
app.use("/api/auth", authRoutes); 

// Test route to verify server is working
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server: http://localhost:${PORT}`));

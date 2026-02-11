const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
// Note: In a real app, you would use bcrypt to compare passwords
// const bcrypt = require("bcryptjs"); 

// Import your User model (Ensure this file exists in your models folder)
const User = require("../models/User");

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get token
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists in MongoDB Atlas
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Validate Password 
    // (Simple check for now; use bcrypt.compare in a real production app)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Create JWT Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "24h" }
    );

    // 4. Send Response (Required for Requirement #3 Navbar behavior)
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        avatar: user.avatar || "https://ui-avatars.com" + user.email // Profile icon fallback
      }
    });

  } catch (err) {
    console.error("Auth Error:", err.message);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;

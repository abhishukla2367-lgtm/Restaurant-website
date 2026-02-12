const router = require("express").Router();
const User = require("../models/User");
const Order = require("../models/Order"); 
const Reservation = require("../models/Reservation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Middleware: verifyToken
 * Decodes the JWT from headers and attaches user info to req.user
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1]; 
    jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid or expired token" });
      req.user = decoded; // Contains id and isAdmin
      next();
    });
  } else {
    res.status(401).json({ message: "Access Denied: No token provided" });
  }
};

/**
 * @route   POST /api/auth/register
 */
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({ 
      ...req.body, 
      password: hashedPassword 
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   POST /api/auth/login
 */
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select("+password");
    
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin || false },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const userObject = user.toObject();
    delete userObject.password;

    res.status(200).json({ ...userObject, accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   GET /api/auth/profile
 * @desc    Task 6: Fetches combined data for the Profile UI
 */
router.get("/profile", verifyToken, async (req, res) => {
  try {
    // 1. Get User info (excluding password)
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // 2. Fetch Orders & Reservations 
    // CRITICAL: We use { user: req.user.id } to match the field name in your Models
    const [orders, reservations] = await Promise.all([
      Order.find({ user: req.user.id }).sort({ createdAt: -1 }),
      Reservation.find({ user: req.user.id }).sort({ date: -1 })
    ]);

    // 3. Return the exact object structure Profile.jsx needs
    res.status(200).json({ 
      user, 
      orders, 
      reservations 
    });
  } catch (err) {
    console.error("Profile Fetch Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

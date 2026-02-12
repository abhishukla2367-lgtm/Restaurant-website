const router = require("express").Router();
const User = require("../models/User");
const Order = require("../models/Order");
const Reservation = require("../models/Reservation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Middleware: verifyToken
 * Task 4: Allows public browsing but restricts specific actions.
 * Used for: Profile access, Reserving tables, and Ordering food.
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Session expired. Please login again." });
      req.user = decoded; 
      next();
    });
  } else {
    res.status(401).json({ message: "Access Denied: Please login to continue" });
  }
};

/**
 * @route   POST /api/auth/register
 * @desc    Task 5: Register User (with Phone/Address) and store in MongoDB Atlas
 */
router.post("/register", async (req, res) => {
  try {
    // Destructuring new fields required for Task 5
    const { name, email, password, phone, address } = req.body;

    // 1. Validation: Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    // 2. Task 5: Password hashing for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Save to MongoDB Atlas with new fields
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,   // Required field
      address, // Required field
      role: req.body.role || "user"
    });

    await newUser.save();
    res.status(201).json({ message: "Registration successful! You can now login." });
  } catch (err) {
    res.status(500).json({ message: "Registration failed: " + err.message });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Task 5: Login using email/password & Task 3: Navbar Toggle
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user in MongoDB
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    // 2. Compare passwords
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid email or password" });

    // 3. Task 3 & 5: Create JWT (Frontend uses this to show Profile icon)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    // 4. Send user data (minus password)
    const { password: _, ...userData } = user.toObject();
    res.status(200).json({ ...userData, token });
  } catch (err) {
    res.status(500).json({ message: "Login error: " + err.message });
  }
});

/**
 * @route   GET /api/auth/profile
 * @desc    Task 6: Show user details (inc. phone/address), My Orders, and My Reservations
 */
router.get("/profile", verifyToken, async (req, res) => {
  try {
    // Task 6: Fetch everything related to this user from MongoDB Atlas
    const [user, orders, reservations] = await Promise.all([
      User.findById(req.user.id).select("-password"),
      Order.find({ user: req.user.id }).sort({ createdAt: -1 }),
      Reservation.find({ user: req.user.id }).sort({ date: -1 })
    ]);

    if (!user) return res.status(404).json({ message: "User profile not found" });

    res.status(200).json({
      user,          // Contains phone and address
      orders,        // Task 6: Display My Orders
      reservations   // Task 6: Display My Reservations
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving profile data" });
  }
});

module.exports = router;

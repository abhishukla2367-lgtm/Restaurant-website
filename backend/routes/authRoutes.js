const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * MIDDLEWARE: Verify Token
 * Correctly extracts 'Bearer <token>' and handles authorization logic.
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    
    jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid or expired" });
      }
      req.user = decoded; // Contains id and email from the payload
      next();
    });
  } else {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }
};

/**
 * ROUTE: REGISTER
 * Path: POST /api/auth/register
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User - Default empty arrays for items/orders prevent frontend .length errors
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      orders: [], // Ensure this matches your User Schema
      cart: []
    });

    const savedUser = await newUser.save();
    res.status(201).json({ 
      message: "User created successfully", 
      userId: savedUser._id 
    });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

/**
 * ROUTE: LOGIN
 * Path: POST /api/auth/login
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Sign Token
    if (!process.env.JWT_SEC) {
      throw new Error("JWT_SEC is missing in environment variables");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      process.env.JWT_SEC, 
      { expiresIn: "1d" }
    );
    
    // Remove password from response object
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ 
        message: "Login successful",
        user: userResponse, 
        token 
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Server Error during login" });
  }
});

/**
 * ROUTE: GET PROFILE
 * Path: GET /api/auth/profile
 */
router.get("/profile", verifyToken, async (req, res) => {
  try {
    // Fetch user details, excluding password
    const user = await User.findById(req.user.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Explicitly returning user data
    res.status(200).json(user);
  } catch (err) {
    console.error("Profile Error:", err.message);
    res.status(500).json({ message: "Error fetching profile" });
  }
});

module.exports = router;

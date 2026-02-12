const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Requirement #5: Store user data in database
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Note: Default role is usually 'user' in the Schema
        const newUser = await User.create({ 
            name, 
            email, 
            password: hashedPassword 
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user and include role for the middleware to work
        const user = await User.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            // CRITICAL: Include 'role' in the token so adminMiddleware can read it
            const token = jwt.sign(
                { id: user._id, role: user.role }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1d' }
            );

            // Requirement #6: Return user details for the Profile page
            res.json({ 
                token, 
                user: { 
                    id: user._id, 
                    name: user.name, 
                    email: user.email,
                    role: user.role 
                } 
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get User Profile (Requirement #6)
exports.getProfile = async (req, res) => {
    try {
        // req.user.id comes from your authMiddleware
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const jwt = require("jsonwebtoken");

/**
 * PROTECT MIDDLEWARE (Task 4)
 * Redirects or blocks users if they aren't logged in.
 * Required for: Reserving table, Ordering food.
 */
const protect = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token using secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Task 6/8: Attach user (id, role) to request
    req.user = decoded; 
    next();
  } catch (err) {
    // Task 3: If token is expired/invalid, frontend should redirect to Login
    res.status(401).json({ message: "Token is not valid or expired" });
  }
};

/**
 * ADMIN MIDDLEWARE (Task 7 & 8)
 * Restricts access to Admin-side Reservation & Orders pages.
 */
const admin = (req, res, next) => {
  // Must be used AFTER protect middleware
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin privileges required." });
  }
};

module.exports = { protect, admin }; // Exports matched to your route imports

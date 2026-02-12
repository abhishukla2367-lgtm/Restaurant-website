const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    // Task 5: Proper email validation for form security
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false, // Security: Prevents password leakage in API responses
  },
  // Task 6: Required fields to show in Profile page
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true
  },
  address: {
    type: String,
    required: [true, "Residential address is required"],
    trim: true
  },
  avatar: {
    type: String,
    default: "https://ui-avatars.com",
  },
  // Task 7 & 8: Powers Admin side Reservation and Orders pages
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
}, { 
  // Task 6: Timestamps provide "Member Since" data for the Profile
  timestamps: true 
});

module.exports = mongoose.model("User", UserSchema);

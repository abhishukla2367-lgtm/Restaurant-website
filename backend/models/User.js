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
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false, 
  },
  // Added for Task 6 Profile Details
  phone: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  avatar: {
    type: String,
    default: "https://ui-avatars.com",
  },
}, { 
  timestamps: true 
});

module.exports = mongoose.model("User", UserSchema);

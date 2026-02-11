const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"], // Added custom error message
    unique: true,
    lowercase: true, // Automatically converts to lowercase to prevent duplicates like Test@io and test@io
    trim: true,     // Removes accidental spaces
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false, // Ensures password isn't accidentally leaked in "get user" API calls
  },
  avatar: {
    type: String,
    // Better default: uses the name to generate a dynamic avatar if one isn't provided
    default: "https://www.gravatar.com",
  },
}, { 
  timestamps: true // Correct: handles createdAt and updatedAt automatically
});

module.exports = mongoose.model("User", UserSchema);

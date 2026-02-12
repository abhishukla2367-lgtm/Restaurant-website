const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // Helpful for debugging - tells you exactly WHICH host you're on
        console.log(`MongoDB Connected: ${conn.connection.host}`); 
    } catch (err) {
        console.error("Database Connection Error:", err.message);
        process.exit(1); // Stop server if DB isn't reachable
    }
};

module.exports = connectDB;

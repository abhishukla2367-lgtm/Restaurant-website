const Reservation = require('../models/Reservation');

/**
 * @desc    Create a new table reservation (Task 7)
 * @access  Private (Logged-in users only)
 */
exports.createReservation = async (req, res) => {
    try {
        const { date, time, guests, tableNumber, specialRequests } = req.body;

        // Task 7: Validation check (Ensures no empty reservations)
        if (!date || !time || !guests) {
            return res.status(400).json({ error: "Date, time, and guest count are required." });
        }

        // Create reservation linked to the logged-in user
        const newReservation = await Reservation.create({
            user: req.user.id, // Linked via Auth Middleware
            date,
            time,
            guests,
            tableNumber,
            specialRequests
        });

        res.status(201).json({ success: true, data: newReservation });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * @desc    Get reservations for the logged-in user's profile (Task 6)
 * @access  Private
 */
exports.getMyReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user.id }).sort({ date: -1 });
        res.status(200).json({ success: true, count: reservations.length, data: reservations });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @desc    Get all reservations for Admin Dashboard (Task 7)
 * @access  Private/Admin
 */
exports.getAllReservations = async (req, res) => {
    try {
        // Populate user details (name/email) to identify who made the booking
        const reservations = await Reservation.find()
            .populate('user', 'name email')
            .sort({ date: -1 });
            
        res.status(200).json({ success: true, data: reservations });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

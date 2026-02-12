const Reservation = require('../models/Reservation');

// Create Reservation
exports.createReservation = async (req, res) => {
    try {
        const newReservation = await Reservation.create({ ...req.body, user: req.user.id });
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get All Reservations (Admin Side)
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('user', 'name email');
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

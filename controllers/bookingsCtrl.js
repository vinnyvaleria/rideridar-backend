const mongoose = require("mongoose");
const bookingModel = require("../models/bookingsModel");

async function createBooking(req, res) {
    try {
        const booking = await bookingModel.addBooking(req.body);
        res.status(201).json({
            message: "Booking created successfully",
            data: booking,
        });
    } catch (error) {
        console.error("Error creating booking:", error.message);
    }
}

async function getAllBookings(req, res) {
    try {
        const bookings = await bookingModel.getAllBookings();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getBookingById(req, res) {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({ error: "Invalid booking ID format." });
        }

        const booking = await bookingModel.getBookingById(id);

        if (!booking) {
            return res.status(404).json({ error: "Booking not found." });
        }

        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
};

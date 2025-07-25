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

async function assignDriverToBooking(req, res) {
    try {
        const { id } = req.params;
        const { driverId } = req.body;

        // Debug logs
        console.log("Booking ID:", id);
        console.log("Driver ID from body:", driverId);
        console.log("Full request body:", req.body);

        if (!driverId) {
            return res.status(400).json({ error: "Driver ID is required" });
        }

        const updatedBooking = await bookingModel.updateDriver(id, driverId);

        if (!updatedBooking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.json({
            success: true,
            message: "Driver assigned successfully",
            data: updatedBooking,
        });
    } catch (error) {
        console.error("Error assigning driver:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    assignDriverToBooking,
};

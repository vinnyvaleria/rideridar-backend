const bookingModel = require("../models/bookingsModel");

async function createBooking(req, res) {
  try {
    const booking = await bookingModel.addBooking(req.body);
    res
      .status(201)
      .json({ message: "Booking created successfully", data: booking });
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

module.exports = {
  createBooking,
  getAllBookings,
};

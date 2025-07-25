const Booking = require("../daos/bookingDao");

async function addBooking(data) {
    return await Booking.create(data);
}

async function getAllBookings() {
    return await Booking.find({});
}

async function getBookingById(id) {
    return await Booking.findById(id);
}

module.exports = {
    addBooking,
    getAllBookings,
    getBookingById,
};

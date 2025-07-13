const Booking = require("../daos/bookingDao");

async function addBooking(data) {
  return await Booking.create(data);
}

async function getAllBookings() {
  return await Booking.find({});
}

module.exports = {
  addBooking,
  getAllBookings,
};

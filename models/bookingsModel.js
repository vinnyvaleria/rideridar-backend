const Booking = require("../daos/bookingDao");
const Driver = require("../daos/driverDao");

async function addBooking(data) {
    return await Booking.create(data);
}

async function getAllBookings() {
    return await Booking.find({});
}

async function getBookingById(id) {
    return await Booking.findById(id).populate("driverAssigned");
}

async function updateDriver(bookingId, driverId) {
    // get driver object from driver model
    const driver = await Driver.findById(driverId);
    console.log("Found driver:", driver ? driver.name : "NOT FOUND");

    // double-check on status
    if (driver.status !== "active") {
        return res.status(400).json({ error: "Driver is not active" });
    }

    if (!driver) {
        return res.status(404).json({ error: "Driver not found" });
    }

    return await Booking.findByIdAndUpdate(
        bookingId,
        {
            driverAssigned: driver._id,
            vehicle: {
                plateNumber: driver.vehicle.plateNumber,
                model: driver.vehicle.model,
                vehicleType: driver.vehicle.vehicleType,
            },
        },
        { new: true }
    ).populate("driverAssigned");
}

module.exports = {
    addBooking,
    getAllBookings,
    getBookingById,
    updateDriver,
};

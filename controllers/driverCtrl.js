const driverModel = require("../models/driverModel");

async function createDriver(req, res) {
    try {
        const driver = await driverModel.addDriver(req.body);
        res.status(201).json({
            message: "Driver created successfully",
            data: driver,
        });
    } catch (error) {
        console.error("Error creating driver:", error.message);
        res.status(500).json({ error: error.message });
    }
}

async function showAllDrivers(req, res) {
    try {
        const drivers = await driverModel.getAllDrivers();
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createDriver,
    showAllDrivers,
};

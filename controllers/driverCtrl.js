const mongoose = require("mongoose");
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

async function showDriverById(req, res) {
    const { id } = req.params;
    // console.log("Id received:", id);

    // Validate ObjectId format before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid driver ID format" });
    }
    // console.log("isValid:", mongoose.Types.ObjectId.isValid(id));

    try {
        const driver = await driverModel.getDriverById(id);
        if (!driver) {
            return res.status(404).json({ error: "Driver not found" });
        }
        res.json(driver);
    } catch (error) {
        console.error("Error fetching driver by ID:", error.message);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createDriver,
    showAllDrivers,
    showDriverById,
};

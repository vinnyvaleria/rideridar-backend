const driverModel = require("../models/driverModel");

async function showAllDrivers(req, res) {
    try {
        const drivers = await driverModel.getAllDrivers();
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function showDriverById(req, res) {
    try {
        const { id } = req.params;
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

async function createDriver(req, res) {
    try {
        const driverResp = await driverModel.addDriver(req.body);
        if (
            driverResp.status &&
            (driverResp.status === 1 || driverResp.status === 2)
        ) {
            return res.status(400).json({ message: driverResp.message });
        } else {
            return res.json({ message: driverResp.message });
        }
    } catch (error) {
        console.error("Error creating driver:", error.message);
        res.status(500).json({ error: error.message });
    }
}

async function loginDriver(req, res) {
    try {
        const driverResp = await driverModel.loginDriver(req.body);
        if (
            driverResp.status &&
            (driverResp.status === 1 ||
                driverResp.status === 2 ||
                driverResp.status === 3)
        ) {
            return res.status(400).json({ message: driverResp.message });
        } else {
            return res.json({
                message: driverResp.message,
                token: driverResp.token,
            });
        }
    } catch (error) {
        console.error("Error login:", error.message);
        res.status(500).json({ error: error.message });
    }
}

async function logoutDriver(req, res) {
    try {
        if (!req.user || !req.user.email) {
            return res.status(401).json({
                message: "Driver not authenticated.",
            });
        }

        const email = req.user.email;
        const driverResp = await driverModel.logoutDriver({ email });

        if (driverResp.status && driverResp.status === 1) {
            return res.status(404).json({ message: driverResp.message });
        } else {
            return res.json({ message: driverResp.message });
        }
    } catch (error) {
        console.error("Error logout:", error.message);
        res.status(500).json({ error: error.message });
    }
}

async function showFilteredDrivers(req, res) {
    try {
        const { type, status } = req.query;

        // validate vehicle type if provided
        const validTypes = ["sedan", "mpv", "luxury"];
        if (type && !validTypes.includes(type)) {
            return res.status(400).json({
                error: "Invalid vehicle type. Must be sedan, mpv, or luxury",
            });
        }

        // validate status if provided
        const validStatuses = ["active", "inactive", "suspended"];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({
                error: "Invalid status. Must be active, inactive, or suspended",
            });
        }

        const drivers = await driverModel.getFilteredDrivers(type, status);

        if (!drivers || drivers.length === 0) {
            return res
                .status(404)
                .json({ error: "No drivers found matching the criteria" });
        }

        res.json({
            success: true,
            count: drivers.length,
            filters: { type: type || "all", status: status || "all" },
            data: drivers,
        });
    } catch (error) {
        console.error("Error fetching drivers:", error.message);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    showAllDrivers,
    showDriverById,
    createDriver,
    loginDriver,
    logoutDriver,
    showFilteredDrivers,
};

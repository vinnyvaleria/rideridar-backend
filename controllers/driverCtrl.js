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

module.exports = {
    showAllDrivers,
    showDriverById,
    createDriver,
    loginDriver,
    logoutDriver,
};

const mongoose = require("mongoose");
const adminModel = require("../models/adminModel");

async function showAllAdmins(req, res) {
    try {
        const admins = await adminModel.getAllAdmins();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function showAdminById(req, res) {
    const { id } = req.params;

    // Validate ObjectId format before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid admin ID format" });
    }

    try {
        const admin = await adminModel.getAdminById(id);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        res.json(admin);
    } catch (error) {
        console.error("Error fetching admin by ID:", error.message);
        res.status(500).json({ error: error.message });
    }
}

async function createAdmin(req, res) {
    try {
        const adminResp = await adminModel.addAdmin(req.body);
        if (
            adminResp.status &&
            (adminResp.status === 1 || adminResp.status === 2)
        ) {
            return res.status(400).json({ message: adminResp.message });
        } else {
            return res.json({ message: adminResp.message });
        }
    } catch (error) {
        console.error("Error creating admin:", error.message);
        res.status(500).json({ error: error.message });
    }
}

async function loginAdmin(req, res) {
    try {
        const adminResp = await adminModel.loginAdmin(req.body);
        if (
            adminResp.status &&
            (adminResp.status === 1 ||
                adminResp.status === 2 ||
                adminResp.status === 3)
        ) {
            return res.status(400).json({ message: adminResp.message });
        } else {
            return res.json({
                message: adminResp.message,
                token: adminResp.token,
            });
        }
    } catch (error) {
        console.error("Error login:", error.message);
        res.status(500).json({ error: error.message });
    }
}

async function logoutAdmin(req, res) {
    try {
        if (!req.user || !req.user.email) {
            return res.status(401).json({
                message: "Admin not authenticated.",
            });
        }

        const email = req.user.email;
        const adminResp = await adminModel.logoutAdmin({ email });

        if (adminResp.status && adminResp.status === 1) {
            return res.status(404).json({ message: adminResp.message });
        } else {
            return res.json({ message: adminResp.message });
        }
    } catch (error) {
        console.error("Error logout:", error.message);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    showAllAdmins,
    showAdminById,
    createAdmin,
    loginAdmin,
    logoutAdmin,
};

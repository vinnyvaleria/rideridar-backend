const adminModel = require("../models/adminModel");

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
        const adminResp = await adminModel.loginUser(req.body);
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
                message: "User not authenticated.",
            });
        }
        console.log("req.user:", req.user);
        console.log("req.user.email:", req.user?.email);

        const email = req.user.email;
        const adminResp = await adminModel.logoutUser({ email });

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
    createAdmin,
    loginAdmin,
    logoutAdmin,
};

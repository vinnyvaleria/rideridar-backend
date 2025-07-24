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
            return res.json({ message: adminResp });
        }
    } catch (error) {
        console.error("Error creating adminResp:", error.message);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createAdmin,
};

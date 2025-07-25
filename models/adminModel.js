const { loginAdmin, logoutAdmin } = require("../controllers/adminCtrl");
const Admin = require("../daos/adminDao");
const userModel = require("./userModel");

async function getAllAdmins() {
    return await Admin.find({});
}

async function getAdminById(id) {
    return await Admin.findById(id);
}

async function addAdmin(data) {
    return await userModel.addUser(data, Admin, "admin");
}

async function loginAdmin(data) {
    return await userModel.loginUser(data, Admin, "admin");
}

async function logoutAdmin(data) {
    return await userModel.logoutUser(data, Admin, "admin");
}

module.exports = {
    getAllAdmins,
    getAdminById,
    addAdmin,
    loginAdmin,
    logoutAdmin,
};

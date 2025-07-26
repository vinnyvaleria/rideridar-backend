const Admin = require("../daos/adminDao");
const userModel = require("./userModel");

async function getAllAdmins() {
    return await userModel.getAllUsers(Admin);
}

async function getAdminById(id) {
    return await userModel.getUserById(Admin, id);
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

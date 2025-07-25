const Driver = require("../daos/driverDao");
const userModel = require("./userModel");

async function getAllDrivers() {
    return await Driver.find({});
}

async function getDriverById(id) {
    return await Driver.findById(id);
}
async function addDriver(data) {
    return await userModel.addUser(data, Driver, "driver");
}

async function loginDriver(data) {
    return await userModel.loginUser(data, Driver, "driver");
}

async function logoutDriver(data) {
    return await userModel.logoutUser(data, Driver, "driver");
}

module.exports = {
    getAllDrivers,
    getDriverById,
    addDriver,
    loginDriver,
    logoutDriver,
};

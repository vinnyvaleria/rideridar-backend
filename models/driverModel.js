const Driver = require("../daos/driverDao");
const userModel = require("./userModel");

async function getAllDrivers() {
    return await userModel.getAllUsers(Driver);
}

async function getDriverById(id) {
    return await userModel.getUserById(Driver, id);
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

async function getFilteredDrivers(type, status) {
    const query = {};

    if (type) {
        query["vehicle.vehicleType"] = type;
    }

    if (status) {
        query.status = status;
    }

    return await Driver.find(query);
}

module.exports = {
    getAllDrivers,
    getDriverById,
    addDriver,
    loginDriver,
    logoutDriver,
    getFilteredDrivers,
};

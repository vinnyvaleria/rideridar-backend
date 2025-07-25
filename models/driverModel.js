const Driver = require("../daos/driverDao");

async function addDriver(data) {
    return await Driver.create(data);
}

async function getAllDrivers() {
    return await Driver.find({});
}

async function getDriverById(id) {
    return await Driver.findById(id);
}

module.exports = {
    addDriver,
    getAllDrivers,
    getDriverById,
};

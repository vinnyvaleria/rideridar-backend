const Driver = require("../daos/driverDao");

async function addDriver(data) {
    return await Driver.create(data);
}

async function getAllDrivers() {
    return await Driver.find({});
}

module.exports = {
    addDriver,
    getAllDrivers,
};

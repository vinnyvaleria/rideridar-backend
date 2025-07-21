var express = require("express");
var router = express.Router();
const driverCtrl = require("../controllers/driverCtrl");

router.post("/", driverCtrl.createDriver);
router.get("/", driverCtrl.showAllDrivers);

module.exports = router;

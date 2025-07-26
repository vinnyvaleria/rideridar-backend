var express = require("express");
var router = express.Router();
const driverCtrl = require("../controllers/driverCtrl");
const securityMiddleWare = require("../middlewares/security");

router.get("/", driverCtrl.showAllDrivers);
router.get("/:id", driverCtrl.showDriverById);

router.post("/register", driverCtrl.createDriver);
router.post("/login", driverCtrl.loginDriver);
router.post(
    "/logout",
    securityMiddleWare.checkJWT,
    securityMiddleWare.checkLogin,
    driverCtrl.logoutDriver
);

module.exports = router;

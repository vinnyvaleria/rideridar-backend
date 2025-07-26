var express = require("express");
var router = express.Router();
const adminCtrl = require("../controllers/adminCtrl");
const securityMiddleWare = require("../middlewares/security");

router.get("/", adminCtrl.showAllAdmins);
router.get("/:id", adminCtrl.showAdminById);

router.post("/register", adminCtrl.createAdmin);
router.post("/login", adminCtrl.loginAdmin);
router.post(
    "/logout",
    securityMiddleWare.checkJWT,
    securityMiddleWare.checkLogin,
    adminCtrl.logoutAdmin
);

module.exports = router;

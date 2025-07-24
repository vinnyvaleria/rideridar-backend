var express = require("express");
var router = express.Router();
const adminCtrl = require("../controllers/adminCtrl");

router.post("/register", adminCtrl.createAdmin);
router.post("/login", adminCtrl.loginAdmin);

module.exports = router;

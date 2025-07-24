var express = require("express");
var router = express.Router();
const adminCtrl = require("../controllers/adminCtrl");

router.post("/register", adminCtrl.createAdmin);
router.get("/test", (req, res) => {
    console.log("GET /admin/test called");
    res.json({ message: "Admin route working!" });
});

console.log("Admin router loaded");

module.exports = router;

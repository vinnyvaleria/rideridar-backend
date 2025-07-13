var express = require("express");
var router = express.Router();
const bookingsCtrl = require("../controllers/bookingsCtrl");

router.post("/", bookingsCtrl.createBooking);
router.get("/", bookingsCtrl.getAllBookings);

module.exports = router;

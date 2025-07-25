var express = require("express");
var router = express.Router();
const bookingsCtrl = require("../controllers/bookingsCtrl");

router.post("/", bookingsCtrl.createBooking);
router.get("/", bookingsCtrl.getAllBookings);
router.get("/:id", bookingsCtrl.getBookingById);

module.exports = router;

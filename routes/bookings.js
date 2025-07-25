var express = require("express");
var router = express.Router();
const bookingsCtrl = require("../controllers/bookingsCtrl");

router.post("/", bookingsCtrl.createBooking);
router.get("/", bookingsCtrl.getAllBookings);
router.get("/:id", bookingsCtrl.getBookingById);
router.put("/:id/assign-driver", bookingsCtrl.assignDriverToBooking);

module.exports = router;

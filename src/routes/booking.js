const express = require("express");
const bookingControllers = require("../controllers/bookingController")
const router = express.Router();

router.post("/", bookingControllers.bookingRide)
router.post("/:id", bookingControllers.initTrip)
//router.get("/", require('../controllers/getBooking'));
//router.get("/:id",require('../controllers/getBookingId') );
//router.post("/", require('../controllers/createBooking'));

//ver estas rutas
//router.delete("/:id", );  
//router.patch("/:id", ); 

module.exports = router;
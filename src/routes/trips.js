const express = require("express")
const router = express.Router()
const tripControllers = require("../controllers/tripControler")

router.post("/:id", tripControllers.completeTrip)

module.exports = router;
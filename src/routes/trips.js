const express = require("express")
const router = express.Router()
const tripControllers = require("../controllers/tripController")

router.post("/:id", tripControllers.completeTrip)
router.get("/:id", tripControllers.getOnlyTrip)
router.get("/", tripControllers.getAllTrip)


module.exports = router;
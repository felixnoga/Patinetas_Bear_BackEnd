const express = require("express")
const router = express.Router()
const controllers = require("../controllers/scooterController")

router.get("/available/:geometry", controllers.scootersInZone)

module.exports = router;
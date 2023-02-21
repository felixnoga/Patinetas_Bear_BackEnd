const express = require("express");
const router = express.Router();
const app = express();


router.use("/scooters", require("./scooters"));
router.use("/booking", require("./booking"));
router.use("/user", require('./user'));
router.use("/trip", require("./trips"));

router.get("/", (req, res) => {
    res.status(200).send("Thanks for login!");
});



module.exports = router;

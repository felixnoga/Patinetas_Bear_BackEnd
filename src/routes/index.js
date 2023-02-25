const express = require("express");
const router = express.Router();
const app = express();



app.use("/user", require('./user'));
app.use("/client", require('./clients'));


router.use("/scooters", require("./scooters"));
router.use("/booking", require("./booking"));
// router.use("/user", require('./user'));
router.use("/trip", require("./trips"));
router.post("/payment", require("../controllers/paymentController"))

/*router.get("/", (req, res) => {
    res.status(200).send("Thanks for login!");
});*/



module.exports = router;

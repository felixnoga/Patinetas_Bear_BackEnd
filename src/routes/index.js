const express = require("express");
const router = express.Router();
const app = express();


//app.use("/booking", require('./booking'));
router.use("/user", require('./user'))

router.get("/", (req, res) => {
    res.status(200).send("Thanks for login!");
});


module.exports = router;

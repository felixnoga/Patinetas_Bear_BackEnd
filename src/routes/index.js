const express = require("express");
const router = express.Router();
const app = express();


// app.use("/booking", require('./booking'));
app.use("/user", require('./user'));
app.use("/client", require('./clients'));


/*router.get("/", (req, res) => {
    res.status(200).send("Thanks for login!");
});*/



module.exports = router;

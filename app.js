const express = require("express")
const cors = require("cors");
//const validateToken = require('./middlewares/validateToken')
require('dotenv').config();

const app = express();
const PORT = 3005

//middlewares here
app.use(express.json()); // this to get req.body
app.use(cors());
//app.use('/secure-request' /*routes*/);

//IMPORT ROUTES
app.use('/', require('./src/routes/index'));
app.use("/login", require('./src/routes/login'));
app.use("/user", require('./src/routes/user'));
app.use("/register", require('./src/controllers/registerController'));
//app.use("/booking", require('./src/routes/booking'));

app.listen(PORT,
    () => { console.log(`server in port ${PORT}`) })


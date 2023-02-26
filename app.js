const express = require("express")
const cors = require("cors");
// const validateToken = require('./src/middlewares/validateToken')
// const triggerClient = require('./src/middlewares/triggerClient')
require('dotenv').config();

const app = express();
const PORT = 3005

//middlewares here
app.use(express.json()); // this to get req.body
app.use(cors());

//IMPORT ROUTES
app.use('/', require('./src/routes/index'));
app.use("/login", require('./src/routes/login')); 
app.use("/register", require('./src/routes/user'));
app.use("/client", require('./src/routes/client')) 


app.listen(PORT,
    () => { console.log(`server in port ${PORT}`) })



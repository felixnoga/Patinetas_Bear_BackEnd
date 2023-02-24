const express = require("express")
const cors = require("cors");
//const validateToken = require('./src/middlewares/validateToken')
require('dotenv').config();

const app = express();
const PORT = 3005

//middlewares here
app.use(express.json()); // this to get req.body
app.use(cors());

//IMPORT ROUTES
app.use("/login", require('./src/routes/login')); 
app.use("/register", require('./src/controllers/registerController')); 
// app.use('/', validateToken, require('./src/routes/index'));
app.use('/', require('./src/routes/index'));

app.listen(PORT,
    () => { console.log(`server in port ${PORT}`) })


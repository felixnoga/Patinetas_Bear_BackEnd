const express = require("express")
const cors = require("cors");
const validateToken = require('./middlewares/validateToken')
require('dotenv').config();

const app = express();
const PORT = 3005

//middlewares here
app.use(express.json()); // this to get req.body
app.use(cors());
app.use('/secure-request', validateToken, /*routes*/);

// ROUTES
app.post('/login', require('./controllers/loginController'));
app.post('/register', require("./controllers/registerController"))


app.listen(PORT,
    () => { console.log(`server in port ${PORT}`) })
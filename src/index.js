const express = require("express")
const cors = require("cors");
const validateToken = require('./middlewares/validateToken')
const Carlosroutes = require("./Routes/CarlosRoutes.js")
require('dotenv').config();

const app = express();
const PORT = 3005

//middlewares here
app.use(express.json()); // this to get req.body
app.use(cors());
app.use('/secure-request', validateToken, /*routes*/ );
app.use('/scooters', /*validateToken,*/ Carlosroutes );

// ROUTES
app.post('/login', require('./controllers/loginController'));
app.post('/register', require("./controllers/registerController"))
// app.get("./available/:geometry", controllers.scootersInZone)


app.listen(PORT,
    () => { console.log(`server in port ${PORT}`) })
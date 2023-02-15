const express = require("express")
const cors = require("cors");
const validateToken = require('./middlewares/validateToken');
const router = express.Router();

require('dotenv').config();

const app = express();
const PORT = 3005

//middlewares here
app.use(express.json()); 
app.use(cors());
router.use('/secure-request', validateToken);

// ROUTES
app.post('/login', require('./controllers/loginController'));
app.post('/register', require("./controllers/registerController"));

 
app.listen(PORT,
    () => { console.log(`server in port ${PORT}`) })
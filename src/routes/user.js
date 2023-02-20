const express = require('express');
const router = express.Router();
const { getAllUser, createUser} = require("../controllers/userController")


router.get("/", getAllUser); 
//router.get('/:id', require('../controllers/userController')); 
router.post("/", createUser);

module.exports = router;
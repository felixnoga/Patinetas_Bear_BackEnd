const express = require('express');
const router = express.Router();
const { getAllUser, getOnlyUser} = require("../controllers/userController")
const registerUser  = require("../controllers/registerController")

router.get("/", getAllUser); 
router.get('/:id', getOnlyUser); 
router.post("/", registerUser);

module.exports = router;
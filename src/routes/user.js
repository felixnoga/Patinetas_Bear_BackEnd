const express = require('express');
const router = express.Router();
const { getAllUser, getOnlyUser} = require("../controllers/userController")
const registerUser  = require("../controllers/registerController")
const { userValidator } = require("../service/validatorBack");
const backValidation = require("../middlewares/validate");


router.get("/", getAllUser); 
router.get('/:id', getOnlyUser); 
router.post("/", userValidator, backValidation, registerUser);

module.exports = router;
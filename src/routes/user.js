const express = require('express');
const router = express.Router();
const { getAllUser, createUser, getOnlyUser} = require("../controllers/userController")


router.get("/", getAllUser); 
router.get('/:id', getOnlyUser); 
router.post("/", createUser);

module.exports = router;
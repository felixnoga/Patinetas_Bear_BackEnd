const express = require('express');
const router = express.Router();
const { getAllUser, createUser, getOnlyUser, updateUser } = require("../controllers/userController")


router.get("/", getAllUser); 
router.get('/:id', getOnlyUser); 
router.post("/", createUser);
router.patch("/:id", updateUser);

module.exports = router;
const { UserManager } = require('../models/users.js');

const createUser = async (req, res) => {
    const dataBaseRep = await UserManager.createUser(req.body); //coge informacion del body 
    res.status(201).json(dataBaseRep);
}

const getOnlyUser = async (req, res) => {
    const dataBaseRep = await UserManager.getOnlyUser(req.user_id);
    res.status(200).json(dataBaseRep);
}

const getAllUser = async (req, res) => {
    const dataBaseRep = await UserManager.getAllUser();
    res.status(200).json(dataBaseRep);
}

module.exports = { createUser, getOnlyUser, getAllUser }
const { UserManager } = require('../modelos/users.js');


const getOnlyUser = async (req, res) => {
    const id = parseInt(req.params.id)
    const dataBaseRep = await UserManager.getOnlyUser(id);
    res.status(200).json(dataBaseRep);
}

const getAllUser = async (req, res) => {
    const dataBaseRep = await UserManager.getAllUser();
    res.status(200).json(dataBaseRep);
}

module.exports = { getOnlyUser, getAllUser }


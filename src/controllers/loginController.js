const startConnection = require('../config/connectiondb.js');
const bcrypt = require("bcrypt");

const tokenGenerator = require("../utils/tokenGenerator")


const db = startConnection();

const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log(req.body); // AQUÍ ES, EN DB.QUERY
        const data = await db.query(`SELECT * FROM users WHERE email= $1;`, [email]) 
        const user = data.rows;
        if (user.length == 0) {
            res.status(400).json({
                error: "Usuario no registrado. Regístrate primero",
            });
        } else {
            bcrypt.compare(password, user[0].password, (err, result) => { 
                if (err) {
                    res.status(500).json({
                        error: "Server error",
                    });
                } else if (result === true) { 

                    const token = tokenGenerator(user.email);
                    
                    res.status(200).json({
                        message: "User signed in!",
                        token: token,
                    });
                }
                else {
                    if (result != true)
                        res.status(400).json({
                            error: "Wrong password",
                        });
                }
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error en base de datos durante registro", //Error de database
        });
    };
};


module.exports = loginController;
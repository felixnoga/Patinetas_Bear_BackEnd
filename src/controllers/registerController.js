const startConnection = require("../models/connectiondb.js");

const client = startConnection();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {

    const { user_name, email, password } = req.body;
    try {
        const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [email]);
        const arr = data.rows;
        if (arr.length != 0) {
            return res.status(400).json({
                error: "Email ya registrado", // HASTA AQUÍ BIEN 
            });
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err)
                    res.status(err).json({
                        error: "Error en el servidor",
                    });
                const user = {
                    user_name,
                    email,
                    password: hash,
                };
                var flag = 1;


                client
                    .query(`INSERT INTO users (user_name, email, password) VALUES ($1,$2,$3);`, 
                    [user.user_name, user.email, user.password], (err) => {

                        if (err) {
                            flag = 0;
                            console.error(err);
                            return res.status(500).json({
                                error: "Database error"
                            })
                        }
                        else {
                            flag = 1;
                            res.status(200).send({ message: 'User añadido a la database' });
                        }
                    })
                if (flag) {
                    const token = jwt.sign(
                        {
                            email: user.email
                        },
                        process.env.SECRET_KEY
                    );
                };
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registring user!",
        });
    };
}

module.exports = registerUser;

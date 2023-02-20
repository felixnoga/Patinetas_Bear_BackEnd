
const startConnection = require("../config/connectiondb.js");
const tokenGenerator = require("../utils/tokenGenerator")

const client = startConnection();
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {

    const { user_name, email, password } = req.body;
    try {
        const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [email]);
        const arr = data.rows;
        if (arr.length != 0) {
            return res.status(400).json({
                error: "Email ya registrado",  
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

                            const token = tokenGenerator(user.email);

                            res.status(200).send({ 
                                message: 'User añadido a la database',
                                token: token
                             });
                        }
                    })
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

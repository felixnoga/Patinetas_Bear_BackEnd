// conexión a BD
const startConnection = require('../config/connectiondb');
const bcrypt = require("bcrypt");
const tokenGenerator = require("../utils/tokenGenerator"); 


class User {
    
    constructor(
        user_id = null,
        user_name = null,
        password = null,
        email = null,
        ){
            this.user_id = user_id,
            this.user_name = user_name,
            this.password = password,
            this.email = email
        }
    }
    
    class UserManager {
        static async getOnlyUser(user_id){
            const BDClient = startConnection();
            const queryresponse = await BDClient.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
            BDClient.end();
            console.log(queryresponse)
            return queryresponse.rows;
        };
        
        static async getAllUser(){
            const BDClient =  startConnection();
            const queryresponse = await BDClient.query("SELECT * FROM users");
            BDClient.end();
            console.log(queryresponse)
            return queryresponse.rows;
        };
        
        static async registerUser(newUser){
            const BDClient =  startConnection();
            
            const { user_name, email, password } = newUser;
            
            try {
                const data = await BDClient.query(`SELECT * FROM users WHERE email= $1;`, [email]);
                const arr = data.rows;
                
                if (arr.length != 0) {
                    return ({
                        error: "Email ya registrado",  
                    });
                } else {
                    const hash = await bcrypt.hash(password, 10) 

                    if ("" == hash){ 
                        return({
                            error: "Error en el servidor",
                        });
                    }

                    const user = {
                        user_name,
                        email,
                        password: hash,
                    };
                    
                    const insertedUser = await BDClient.query(`INSERT INTO users (user_name, email, password) VALUES ($1,$2,$3) RETURNING *;`,
                    [user.user_name, user.email, user.password])
                    
                    if ('error' in insertedUser) {
                        console.error(insertedUser);
                        return({
                            error: "Database error when inserting the user"
                        })
                    }
                    
                    else {
                        const token = tokenGenerator(user.email);
                                                 
                        return({
                            token: token,
                            user_id: insertedUser.rows[0].user_id
                        });
                        
                    }
                    
                }  
            }
            catch (err) {
                console.log(err);
                return({
                    error: "Database error while registring user!",
                });
            };
            
        };
    }
    
    module.exports = { User, UserManager };
    
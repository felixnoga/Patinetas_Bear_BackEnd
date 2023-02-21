// conexión a BD
const startConnection = require('../config/connectiondb');

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

    static async createUser(newUser){
        const BDClient =  startConnection();
        const queryresponse = await BDClient.query("INSERT INTO users (user_name, email, password) VALUES ($1,$2,$3) RETURNING*",
        [newUser.user_name, newUser.email, newUser.password]);
        BDClient.end();
        console.log(queryresponse)
            return queryresponse.rows[0];
    };

    static async updateUser(newUser){
        const BDClient =  startConnection();
        const queryresponse = await BDClient.query("UPDATE users (user_name, email, password) VALUES ($1,$2,$3)  WHERE user_id equal id",
        [newUser.user_name, newUser.email, newUser.password]);
        BDClient.end();
        console.log(queryresponse)
        if (!queryresponse) {
            return null;
          }
          return queryresponse;
        }
    }

module.exports = { User, UserManager };

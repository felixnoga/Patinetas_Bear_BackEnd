const startConnection = require('../config/connectiondb');
const { User, UserManager } = require('./users');

class Client extends User {

    constructor(

        client_id = null,
        balance = null,
        no_trips = null, 
        app_uses = null, 
        mapbox_token = null, 

    ){
            super( user_id, user_name, password, email); 

            this.client_id = client_id;
            this.balance = balance;
            this.no_trips = no_trips;
            this.app_uses = app_uses;
            this.mapbox_token = mapbox_token;
        }
}

class ClientManager extends UserManager {
    static async getClients(){
        const BDClient = startConnection();
        const queryResponse = await BDClient.query("SELECT * FROM clients");
        BDClient.end();
        console.log(queryResponse)
            return queryResponse.rows;
    }

    static async getOnlyClient(){
        const BDClient = startConnection();
        const queryresponse = await BDClient.query("SELECT * FROM clients WHERE client_id = $1", [client_id]);
        BDClient.end();
        console.log(queryresponse)
            return queryresponse.rows;
    }

    static async registerClient(newUser){

        const BDClient =  startConnection();

        let userData = await this.registerUser(newUser); 

        if('error' in userData){
            console.error(userData);
            return userData;
        }
          
        const client_id = userData.user_id;

        try {

            const data = await BDClient.query(`SELECT * FROM clients WHERE client_id= $1`, [client_id]);
            const arr = data.rows;

            if(arr.length != 0){
                return({
                    error: "Cliente ya registrado",
                });
            } else {
                const client = {
                    client_id: client_id, 
                    balance : 0,
                    no_trips : 0, 
                    app_uses : 0, 
                    mapbox_token : null, 
                }
                const newClient = await BDClient.query(`INSERT INTO clients (client_id, balance, no_trips, app_uses, mapbox_token) VALUES ($1,$2,$3,$4,$5) RETURNING *;`,
                [client.client_id, client.balance, client.no_trips, client.app_uses, client.mapbox_token]) 
                    
                if('error' in newClient){
                        console.error(newClient);
                        return({
                            error:"Database error"
                        })
                    }
                    else {
                        return({
                            message: 'Cliente añadido a la database',
                        })
                    }
                }
            }

        
         catch (err) {
            console.log(err);
            return({
                error: "Database error while registring client!",
            });
        };

        
    }

}

module.exports = { Client, ClientManager} 
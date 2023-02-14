/*const startConnection = require('./connectiondb');
const { User, UserManager } = require('./users');


class Client extends User {

    constructor(
        user_id, balance, no_trips, app_uses, mapbox_token, user_name, password, email
    ){
            super(  user_id, user_name, password, email);       
        
            this.balance = balance;
            this.no_trips = no_trips;
            this.app_uses = app_uses;
            this.mapbox_token = mapbox_token;
            this.clien_id = user_id
        }
}

class ClientManager extends UserManager{
    static async getClients(){
        const queryResponse = await startConnection.query("SELECT * FROM Clients");
        const newClient = newClientdataObject(queryResponse)
        return newClient
    }



}

module.exports = { Client, ClientManager} */
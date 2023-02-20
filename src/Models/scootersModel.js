const startConnection = require('../config/connectiondb');
require('dotenv').config();

const client= startConnection()

class scootersManager{

    static async scootersInZone (lng, lat){
    const query = 'SELECT scooter_id, batery, lng, lat from scooter where status_id = 1 and lng <= $1 and lng > $2 and lat >= $3 and lat < $4'
    const values= [ lng + 0.2, lng - 0.2, lat -0.1, lat + 0.1]

    try{
        const data = await client.query(query, values) 
        const payload= data.rows
        if(!data.rowCount) return false
        return payload
    }catch(error){
        console.log(error)
        return error
    }
    }

    static async updateScooter(id, lng, lat){
        const query= 'UPDATE scooter SET lng= $1, lat= $2, status_id= 1 WHERE scooter_id = $3'
        try{
            const data= await client.query(query, [lng, lat, id])
            console.log(data.rows)
            return true

        }catch(error){
            const errorMessage = { message: "fail updating scooter geometry", error }
            return errorMessage
        }

    }
    static async bookingScooter(id) {
        const query = 'UPDATE scooter SET status_id= 2 WHERE scooter_id = $1'
        try {
            const data = await client.query(query, [id])
            console.log(data.rows)
            return true

        } catch (error) {
            const errorMessage = { message: "fail updating scooter geometry", error }
            return errorMessage
        }

    }
}


module.exports=  scootersManager
// crear datos de scooter Insert into Scooter(scooter_id, batery, lng, lat, accumulated_km, next_checkup, status_id)
// Values(00001, 50, -3.6862, 40.4, 0, '5/11/2025', 1)
// crear status de scooters -> insert into scooter_status (name) values( 'Available'),( 'Reserved'),('not available')
// Insert into Scooter(scooter_id, batery, lng, lat, accumulated_km, next_checkup, status_id)
// Values(00002, 50, -3.7, 40.4, 0, '5/11/2025', 1)
//     ,(00001, 50, -3.6862, 40.4, 0, '5/11/2025', 1)
//     , (00003, 50, -3.695, 40.4096, 0, '5/11/2025', 1)
//     , (00004, 70, -3.699, 40.405, 0, '5/11/2025', 1)
//     , (00005, 50, -15.422, 28.10807, 0, '5/11/2025', 1)
//     , (00006, 60, -15.400, 28.11, 0, '5/11/2025', 1)
//     , (00007, 35, -15.388, 28.10500, 0, '5/11/2025', 1)
//     , (00008, 45, -3.71, 40.405, 0, '5/11/2025', 1)
// , (00009, 89, -3.7009, 40.3900, 0, '5/11/2025', 3)
// , (00010, 99, -3.635, 40.408, 0, '5/11/2025', 1)
//     , (00011, 58, -3.6, 40.3, 0, '5/11/2025', 3)
//     , (00012, 83, -3.599, 40.41, 0, '5/11/2025', 1);
// ***esto son las foreignkeys  nextval('scooter_client_id_seq'::regclass)**
// nextval('scooter_booking_id_seq'::regclass)
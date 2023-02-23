const startConnection = require('../config/connectiondb');
const scooterModels= require("../Models/scootersModel")
require('dotenv').config();

const client = startConnection()

class BookingManager {

    static async bookingRide(id_user, id_scooter, time){
            const query=(`INSERT INTO booking (client_id, scooter_id, timestamp, status) VALUES ( $1, $2, $3, false) RETURNING *`)
            const values= [id_user, id_scooter, time]
            const code = `${Math.floor(Math.random() * 1000)} - ${id_scooter} `
            try{
                // Cambia el estado de la scooter a RESERVADA
                let data = await scooterModels.bookingScooter(id_scooter)
                // Ejecuta la query creando un Booking
                const payload= await client.query(query, values)
                console.log(payload.rows)
                data = { data: payload.rows[0], code }
                return data
                // TODO Duraciín de 10 min y sino scooter vuelve a cambiar a avilable.
            }catch(error){
                console.log(error)
                throw new Error(error)
            }
        }
    static async initTrip(bookId, time, lng, lat){
            const queryBook = (`UPDATE booking SET status = true WHERE booking_id = $1 RETURNING *`)
            const queryTrip =(`INSERT INTO trips (scooter_id, booking_id, start_date, lng_start, lat_start) VALUES($1, $2, $3, $4, $5) RETURNING *`)
            try{
                const bookUpdated = await client.query(queryBook, [bookId])
                if(bookUpdated.rows){
                    const {scooter_id}= bookUpdated.rows[0]
                    try{
                        const payload= await client.query(queryTrip, [scooter_id, bookId, time, lng , lat ])
                        console.log(payload)
                        const trip= payload.rows[0]
                        return trip
                    }catch(error){
                        console.log(error)
                        const errorMessage = { message: "have an error creating trip", error }
                        return errorMessage
                    }
                    }
            }catch(error){
                const errorMessage= {message:"cant update state of Booking", error}
                return errorMessage
            }
    }
    static async getBooking(bookId){
            const query = ('SELECT * from booking WHERE booking_id = $1')
        try {
            const payload = await client.query(query, [bookId])
            console.log(payload.rows)
            return payload.rows[0]
        } catch (error) {
            const errorMessage = { error, message: "ups, ha habido un error interno" }
            console.log(error)
            return errorMessage
        }
    }
}
module.exports= BookingManager
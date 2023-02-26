const model = require("../Models/bookingModels")
const scooterModel = require("../Models/scootersModel")


const tenMinTocancel= (booking_id, scooter_id) =>{ 
    console.log( "se inicia cron")
    setTimeout( async() => {
        console.log("se inicia cron2", booking_id, scooter_id)
        const type = 'status'
        const status = 1
        // consulta el status del booking a los 10 min
        const bookingStatus = await model.getBookingInfo(type, booking_id)
        // si el status sigue siendo falso(no se ha completado la reserva) se cambia el status de la scooter a Available.
        if (bookingStatus === false) {
            const payload = await scooterModel.bookingScooter(scooter_id, status)
            console.log("fin de cron exitoso", payload)
        }
        console.log(bookingStatus)
    }, 605000)};

module.exports = tenMinTocancel
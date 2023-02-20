const TripManager= require("../Models/tripModels")

const completeTrip= async (req, res)=>{
        const tripId= parseInt(req.params.id)
        // faltacomprobar que ese viaje existe
        const {time , lng, lat}= req.body;
        const payload= await TripManager.completeTrip(tripId, time, lng, lat);
        console.log(tripId, time, lng, lat, payload)
        if(payload.error){
            return res.status(500).json(payload)
        }
        res.status(201).json(payload)
}

module.exports={
    completeTrip
}
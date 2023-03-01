const TripManager= require("../modelos/tripModels")

const completeTrip= async (req, res)=>{
        const tripId= parseInt(req.params.id)
        // faltacomprobar que ese viaje existe
        const {time , lng, lat}= req.body;
        try{
            const payload= await TripManager.completeTrip(tripId, time, lng, lat);
            res.status(201).json(payload)
        }catch(error){
            res.status(500).json({message: "El viaje no ha podido ser completado, ha habido un problema en el servidor"})
        }}

module.exports={
    completeTrip
}
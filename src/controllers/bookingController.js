const BookingManager= require("../Models/bookingModels")

const bookingRide= async (req, res)=>{
    const {id_user , id_scooter}= req.body;
    const time = new Date().toUTCString();
    console.log(req.body, id_user)
    try{
        const info= await BookingManager.bookingRide(id_user, id_scooter, time )
        res.status(201).json(info)
    }catch(error){
        res.status(500).json({ message: "ups, we coudnt make your request"})
    }
}

const initTrip= async(req, res)=>{
    const bookId= parseInt(req.params.id)
    const {lng, lat}= req.body
    const time = new Date().toUTCString();
    console.log(bookId, time, lng, lat)
    try{  
        const info = await BookingManager.initTrip(bookId, time, lng, lat);
        res.status(201).json(info)
    }catch(error){
        res.status(500).json({message: "no hemos podido crear su viaje"})
    }
    
}


module.exports={
    bookingRide,
    initTrip,
    
}
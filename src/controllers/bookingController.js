const BookingManager= require("../Models/bookingModels")

const bookingRide= async (req, res)=>{
    const {id_user,id_scooter}= req.body;
    const time = new Date().toUTCString();
    const info= await BookingManager.bookingRide(id_user, id_scooter, time )
    if(typeof(info)=== "string"){ 
        return res.status(500).json(info).end()
    }
    res.status(201).json(info)
}

const initTrip= async(req, res)=>{
    const bookId= parseInt(req.params.id)
    const {lng, lat}= req.body
    const time = new Date().toUTCString();
    console.log(bookId, time, lng, lat)
    const info = await BookingManager.initTrip(bookId, time, lng, lat);
    if(info.message){
        return res.status(500).json(info).end()
    }
    res.status(201).json(info)

}


module.exports={
    bookingRide,
    initTrip,
    
}
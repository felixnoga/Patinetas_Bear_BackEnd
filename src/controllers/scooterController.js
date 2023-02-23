const model= require("../Models/scootersModel")

const getLoc=(a)=> {
    const geoLoc= a.split(",")
    const [lng , lat ]= geoLoc
    return {lng, lat}
}

const scootersInZone = async (req, res)=>{
    if (!req.params.geometry){
        res.status(400).json({message: "no se ha encontrado su ubicacion" })
    }
    else if (req.params.geometry){
        const {lng, lat}= getLoc(req.params.geometry) 
        const features= await model.scootersInZone(parseFloat(lng), parseFloat(lat))
        res.status(200).json({features})
    }
}
const availableScooterState= async (req, res)=>{
    // validar los datos.comprobar que exite una scooter con ese id.
    const id= parseInt(req.params.id)
    try{
        await model.bookingScooter(id, 1)
        res.status(201).json("request completed")
    }catch(error){
        res.status(500).json({error: "ups, we can't update Status"})
    }
}

module.exports={
    scootersInZone,
    availableScooterState
}
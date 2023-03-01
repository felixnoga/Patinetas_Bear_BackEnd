const {paymentIntent} = require("../models/strypeModels")

const confirmPayment= async (req, res)=>{
    let { id, amount } = req.body 
    amount = parseFloat(amount)
    try{
        console.log(req.body, amount)
        const payment= await paymentIntent({id, amount})
        res.status(200).json({payment, message:"pago aceptado"})
    }catch(error){
        const message= error.raw ? error.raw.message : "ha habido un problema procesando su solicitud"
        res.status(500).json({message})
    }

}

module.exports= confirmPayment 
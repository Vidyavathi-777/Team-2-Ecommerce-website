const orderServices = require("../services/orderServices")

const createOrder = async(req,res) =>{
    try{
        const {userId,orderItems} = req.body
        const order = await orderServices.createOrder(userId,orderItems)
        res.status(201).json(order)
    }catch(error){
        res.status(500).json({error:error.message})
    }

}

const getOrders = async(req,res) =>{
    try{
        const{userId} = req.parama
        const orders = await orderServices.getOrders(userId)
        res.status(200).json(orders)
    }catch(error){
        res.status(500).json({error:error.message})
    }

}

module.exports = {createOrder,getOrders}
const { join } = require('@prisma/client/runtime/library')
const prisma = require('../../prisma/prismaClient')
const cartServices = require('../services/cartServices')
const { json } = require('express')

const addToCart = async(req,res) =>{
   try{
    const {userId,productId,quantity} = req.body
    const cartItem = await cartServices.addToCart(userId,productId,quantity)
    res.status(200).json(cartItem)
   }catch(error){
    res.status(500).json({error:error.message})
   }

}

const getCartItems = async(req,res) =>{
    try{
        const {userId} = req.params
        const cartItems = await cartServices.getCartItems(userId)
        res.status(200).json(cartItems)
    }catch(error){
        res.status(500).json({error:error.message})
    }

}

const removeFromCart = async(req,res) =>{
    try{
        const {userId,productId} = req.params
        await cartServices.removeFromCart(userId,productId)
        res.status(200).json({message:"Item removed from cart"})
    }catch(error){
        res.status(500),json({error:error.message})
    }

}

module.exports = {
    addToCart,
    getCartItems,
    removeFromCart
}
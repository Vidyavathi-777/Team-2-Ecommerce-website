const e = require("express")
const wishlistService = require("../services/wishlistServices")

const addToWishlist = async(req,res) =>{
    try{
        const {userId,productId} = req.body
        const wishlistItem = await wishlistService.addToWishlist(userId,productId)
        res.status(201).json(wishlistItem)
    }catch(error){
        res.status(400).json({error:error.message})
    }

}

const getWishlist = async(req,res) =>{
    try{
        const {userId} = req.parama
        const wishlistItems = await wishlistService.getWishlist(userId)
        res.status(200).json(wishlistItems)
    }catch(error){
        res.status(500).json({error:error.message})
    }

}

const removeFromWishlist = async(req,res) =>{
    try{
        const {userId,productId} = req.body
        await wishlistService.removeFromWishlist(userId,productId)
        res.status(200).json({message:"Item removed from wishlist"})
    }catch(error){
        res.status(500).json({error:error.message})
    }


}

module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist
}
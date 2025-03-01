const prisma = require('../../prisma/prismaClient')

const addToWishlist = async(userId,productId) =>{
    const existingItem = await prisma.wishlist.findFirst({
        where:{userId,productId}
    })

    if(existingItem) {
        throw new Error("Product alreay in wishlist")
    }

    return await prisma.wishlist.create({
        data:{userId,productId}
    })

}

const getWishlist = async(userId) =>{
    return await prisma.wishlist.findMany({
        where:{userId},
        include:{product:true}
    })

}

const removeFromWishlist = async(userId,productId) =>{
    return await prisma.wishlist.deleteMany({
        where:{userId,productId}
    })

}

module.exports ={
    addToWishlist,
    getWishlist,
    removeFromWishlist
}
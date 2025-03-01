const prisma = require('../../prisma/prismaClient')


const addToCart = async (userId, productId, quantity) => {
    if (!userId || !productId) {
        throw new Error("User ID and Product ID are required.");
    }

   
    const product = await prisma.product.findUnique({
        where: { id: productId }
    });

    if (!product) {
        throw new Error("Product not found.");
    }

   
    const existingCartItem = await prisma.cart.findFirst({
        where: { userId, productId }
    });

    if (existingCartItem) {
        return await prisma.cart.update({
            where: { id: existingCartItem.id },
            data: { quantity: existingCartItem.quantity + quantity }
        });
    }

   
    return await prisma.cart.create({
        data: {
            userId,
            productId,
            quantity
        }
    });
};

const getCartItems = async(userId)=>{

    return await prisma.cart.findMany({
        where :{userId},
        include:{product:true}
    })

}

const removeFromCart = async(userId,productId) =>{
    return await prisma.cart.deleteMany({
        where:{userId,productId}
    })

}

module.exports={
    addToCart,
    getCartItems,
    removeFromCart
}
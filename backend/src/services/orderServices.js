const prisma = require('../../prisma/prismaClient')

const createOrder = async(userId,orderItem) =>{
    let total = 0
    for(let item of orderItem){
        const product = await prisma.product.findUnique({where:{id:item.productId}})
        if (!product) throw new Error(`Product ${item.productId} not found`)
        total += product.price * item.quantity
    }
    return await prisma.order.create({
        data:{
            userId,
            total,
            orderItem:{
                create: orderItem.map(item =>({
                    productId:item.productId,
                    quantity:item.quantity,
                    price:item.price
                }))
            }
        }
    })

}

const getOrders = async(userId) =>{
    return await prisma.order.findMany({
        where:{userId},
        include:{orderItems:{
            include:{product:true}
        }}
    })

}

module.exports = {
    createOrder,
    getOrders
}
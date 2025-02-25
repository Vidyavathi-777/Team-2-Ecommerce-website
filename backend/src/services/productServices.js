const prisma = require('../../prisma/prismaClient');

const getAllProducts = async() =>{
    return await prisma.product.findMany()
}

const addProduct = async({name,
    description,
    price,
    stock,
    imageUrl,
    category,
    subcategory,
    brand, }) =>{
    return await prisma.product.create({
        data: {name,description,price,stock,imageUrl,category,subcategory,brand},
    });
}

const updateProduct = async(id,data) =>{
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
        console.log("Product not found!");
        throw new Error("Product not found");
    }

    return await prisma.product.update({
        where: { id },
        data,
    });
}

const deleteProduct = async(id) =>{
    return await prisma.product.delete({where:{id},})
}
module.exports ={getAllProducts,addProduct,updateProduct,deleteProduct}
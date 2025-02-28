const prisma = require('../../prisma/prismaClient');

const getAllProducts = async() =>{
    return await prisma.product.findMany({
        include:{
            category:true,
            subcategory:true,
            brand:true,
            images:true,
            variants:true,
            specifications:true,
            type:true,

        }
    })
}

const addProduct = async({name,
    description,
    price,
    stock,
    imageUrl,
    categoryId,
    subcategoryId,
    brandId,
    typeId,
    images }) =>{
    return await prisma.product.create({
        data: {
            name,
            description,
            price,
            stock,
            imageUrl,
            category : {connect:{id:categoryId}},
            subcategory:subcategoryId ? {connect:{id:subcategoryId}} : undefined,
            brand : brandId ? {connect:{id:brandId}}:undefined,
            type : typeId ? {connect:{id : typeId}}:undefined,
            images: {
                create: images?.map(URL => ({ URL })) || []
            }

        },
    });
}

const updateProduct = async(id,data) =>{
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
        
        throw new Error("Product not found");
    }

    return await prisma.product.update({
        where: { id },
        data,
    });
}

const deleteProduct = async(id) =>{
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
        
        throw new Error("Product not found");
    }
    return await prisma.product.delete({where:{id} })
}
module.exports ={getAllProducts,addProduct,updateProduct,deleteProduct}
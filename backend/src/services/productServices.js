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



const getAllCategories=async() =>{
    return await prisma.category.findMany({
        include:{
            products:true,    
        }
    })
}

const getCategoryProducts = async(name) =>{
    return await prisma.category.findFirst({
        where:{name:{equals:name,mode:"insensitive"}},
        include:{
            products:true,

        }
    })
}


const getAllSubcategories = async() =>{
    return await prisma.subCategory.findMany({
        include:{
            products:true,
        }
    })
}

const getSubcategoryProducts = async(name) =>{
    return await prisma.subCategory.findFirst({
        where:{name:{equals:name,mode:"insensitive"}},
        include:{
            products:true,
           
        }
    })
}


const getAllProductTypes = async() =>{
    return await prisma.type.findMany({
        include:{
            products:true,
        }
    })
}

const getTypeProducts = async(name)=>{
    return await prisma.type.findFirst({
        where:{name:{equals:name,mode:"insensitive"}},
        include:{
            subcategory:true,
            products:true,
        }
    })
}

const getAllBrands = async() =>{
    return await prisma.brand.findMany({
        include:{
            products:true
        }
    })
}

const getBrandProduct = async(name) =>{
    return await prisma.brand.findFirst({
        where:{name:{equals:name,mode:"insensitive"}},
        include:{
            products:true,
        }
    })
}


module.exports ={getAllProducts,
                getAllCategories,
                getAllSubcategories,
                getAllProductTypes,
                getCategoryProducts,
                getSubcategoryProducts,
                getTypeProducts,
                getAllBrands,
                getBrandProduct
            }
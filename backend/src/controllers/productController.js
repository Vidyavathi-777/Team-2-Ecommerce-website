const prisma = require('../../prisma/prismaClient')
const productService = require('../services/productServices')

const getAllProducts = async(req,res) =>{
    try{
        const products = await productService.getAllProducts()
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({ error: error.message });

    }
}

const getProductById =async(req,res) =>{
    try{
        const {id} = req.params
        const product = await productService.getProductById(id)
        res.status(201).json(product)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const getAllCategories = async(req,res) =>{
    try{
        const categories = await productService.getAllCategories()
        res.status(200).json(categories)
    }catch(error){
        res.status(500).json({error:error.message})
    }

}

const getCategoryProducts = async(req,res) =>{
    try{
        const {name} = req.params
        if (!name) {
            return res.status(400).json({ error: "Category name is required" })
        }
        const category = await productService.getCategoryProducts(name)
        if (!category) {
            return res.status(404).json({ error: "Category not found" })
        }
        res.status(200).json(category)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}


const getAllSubcategories =async (req,res) =>{
    try{
        const subcategories = await productService.getAllSubcategories()
        res.status(200).json(subcategories)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const getSubcategoryProducts = async(req,res) =>{
    try{
        const {name} = req.params
        if (!name) {
            return res.status(400).json({ error: " Sub-category name is required" })
        }
        const category = await productService.getSubcategoryProducts(name)
        if (!category) {
            return res.status(404).json({ error: "Sub-category not found" })
        }
        res.status(200).json(category)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const getAllProductTypes = async(req,res) =>{
    try{
        const types = await productService.getAllProductTypes()
        res.status(200).json(types)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
const getTypeProducts = async(req,res) =>{
    try{
        const {name} = req.params
        if (!name) {
            return res.status(400).json({ error: "Product type name is required" })
        }
        const type = await productService.getTypeProducts(name)
        if (!type) {
            return res.status(404).json({ error: "Product type not found" })
        }
        res.status(200).json(type)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const getAllBrands = async(req,res) =>{
    try{
        const brands = await productService.getAllBrands()
        res.status(200).json(brands)

    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const getBrandProduct = async(req,res) =>{
    try{
        const {name} = req.params
        if (!name) {
            return res.status(400).json({ error: "Brand name is required" })
        }
        const brand = await productService.getBrandProduct(name)
        if (!brand) {
            return res.status(404).json({ error: "Brand not found" })
        }
        res.status(200).json(brand)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
module.exports = {getAllProducts,
                  getProductById,
                  getAllCategories,
                  getAllSubcategories,
                  getAllProductTypes,
                  getCategoryProducts,
                  getSubcategoryProducts,
                  getTypeProducts,
                  getAllBrands,
                  getBrandProduct
                }
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

const addProduct = async(req,res) =>{
    try{
        const product  = await productService.addProduct(req.body)
        res.status(201).json(product)
    }catch(error){
        res.status(500).json({error : error.message})
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedProduct = await productService.updateProduct(id, updateData);
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async(req,res) =>{
    try {
        const { id } = req.body;
        await productService.deleteProduct(id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {getAllProducts,addProduct,updateProduct,deleteProduct}
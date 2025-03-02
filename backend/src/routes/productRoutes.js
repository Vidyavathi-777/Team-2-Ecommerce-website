const express = require('express')
const {getAllProducts,
       getProductById,
       getAllCategories,
       getAllSubcategories,
       getAllProductTypes,
       getCategoryProducts,
       getSubcategoryProducts,
       getTypeProducts,
       getAllBrands,
       getBrandProduct
    } = require('../controllers/productController')
const {protect,authorize} = require('../middlewares/authMiddleware')
const router = express.Router()

router.get("/", getAllProducts);
router.get("/:id",getProductById)

router.get("/categories",getAllCategories)
router.get("/subcategories",getAllSubcategories)
router.get("/types",getAllProductTypes)
router.get("/brands",getAllBrands)

router.get("/category/:name",getCategoryProducts)
router.get("/subcategory/:name",getSubcategoryProducts)
router.get("/type/:name",getTypeProducts)
router.get("/brand/:name",getBrandProduct)


module.exports = router
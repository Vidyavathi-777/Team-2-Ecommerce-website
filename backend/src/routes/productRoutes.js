const express = require('express')
const {getAllProducts,addProduct,updateProduct,deleteProduct} = require('../controllers/productController')
const {protect,authorize} = require('../middlewares/authMiddleware')
const router = express.Router()

router.get("/", getAllProducts);
router.post("/addProduct", protect, authorize("seller", "admin"), addProduct);
router.put("/updateProduct/:id", protect, authorize("seller", "admin"), updateProduct);
router.delete("/deleteProduct", protect, authorize("seller", "admin"), deleteProduct);
module.exports = router
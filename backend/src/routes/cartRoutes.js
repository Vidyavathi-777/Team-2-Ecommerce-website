const express = require("express")
const {addToCart,getCartItems,removeFromCart} = require("../controllers/cartController")

const router = express.Router()

router.post("/addCart",addToCart)
router.get("/:userId",getCartItems)
router.delete("/remove",removeFromCart)

module.exports = router
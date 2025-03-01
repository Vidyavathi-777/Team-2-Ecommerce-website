const express = require("express")
const {createOrder,getOrders} = require("../controllers/orderController")

const router = express.Router()

router.post("/addOrder",createOrder)
router.get("/:userId",getOrders)

module.exports = router
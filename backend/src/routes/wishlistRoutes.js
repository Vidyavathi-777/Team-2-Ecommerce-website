const express = require("express")
const{addToWishlist,getWishlist,removeFromWishlist} = require("../controllers/wishlistController")

const router = express.Router()

router.post("/addWishlist",addToWishlist)
router.get("/:userId",getWishlist)
router.delete("/remove",removeFromWishlist)

module.exports = router
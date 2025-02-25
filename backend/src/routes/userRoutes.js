const express = require('express')
const {registerUser,loginUser,getUserProfile,updateUserProfile,deleteUserProfile} = require('../controllers/userController')
const {protect} = require('../middlewares/authMiddleware')
const router = express.Router()

router.post("/register",registerUser);
router.post("/login",loginUser)
router.get("/profile",protect,getUserProfile)
router.put("/profile",protect,updateUserProfile)
router.delete("/profile",protect,deleteUserProfile)

module.exports = router
const prisma = require('../../prisma/prismaClient');
const userService = require('../services/userServices')


const registerUser = async(req,res) =>{
    try{
        const { name, email, password, role, phone } = req.body;
        console.log("Received Data:", req.body);
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const user = await userService.registerUser({name,email,password,role,phone})
        res.status(201).json(user)    
    }catch(error){
        res.status(400).json({error:error.message})
    }

}

const loginUser = async(req,res) =>{
    try{
        const{email,password} = req.body
        // console.log("Email:", email);
        // console.log("Password:", password);
        const {token,user} = await userService.loginUser(email,password)
        res.status(200).json({token,user})
    }catch(error){
        res.status(400).json({error:error.message})
    }

}

const getUserProfile = async(req,res) =>{
    try{
        const user = await userService.getUserProfile(req.user.id)
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(201).json(user)
    }catch(error){
        res.status(400).json({error:error.message})
    }

}

const updateUserProfile = async(req,res) =>{
    try{
        const updateUser = await userService.updateUserProfile(req.user.id,req.body)
        res.status(201).json(updateUser)

    }catch(error){
        res.status(400).json({error:error.message})
    }

}

const deleteUserProfile =async(req,res) =>{
    try{
        const deleteUser = await userService.deleteUserProfile(req.user.id)
        res.status(201).json({message:"User deleted successfully"})
    }catch(error){
        res.status(400).json({error:error.message})
    }

}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
};

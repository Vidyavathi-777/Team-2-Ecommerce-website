const prisma = require('../../prisma/prismaClient')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const isStrongPassword = (password) =>{
    return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password)
}

const registerUser = async ({ name, email, password, role, phone }) => {
    if (!name || !email || !password) {
        throw new Error("All fields are required");
    }
    if (!isValidEmail(email)) {
        throw new Error("Invalid email format");
    }
    if (!isStrongPassword(password)) {
        throw new Error("Password must be at least 8 characters long, include a number and an uppercase letter.");
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
        data: { name, email, password: hashedPassword, role, phone },
    });
};

const loginUser = async(email,password) =>{
   
    const user = await prisma.user.findUnique({ where: { email} });
    
    if(!user) throw new Error("Invalid email ");

    const isMatch = await bcrypt.compare(password,user.password)
   
    if(!isMatch) throw new Error("Invalid Password");

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
    
    return { 
        token, 
        user: { id: user.id, name: user.name, email: user.email, role: user.role } };
    
}

const getUserProfile = async(id) =>{
    return await prisma.user.findUnique({
        where:{id},
        include:{
            id:true,
            name:true,
            email:true,
            role:true,
            createdAt: true,
            orders:true,
            wishlist:true,
            address:true,
            cartItems:true

        }
    })

}

const updateUserProfile = async(id,updateData) =>{
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return await prisma.user.update({
        where:{id},
        data:updateData,
    })

}

const deleteUserProfile =async(id) =>{
    return await prisma.user.delete({
        where:{id}
    })

}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
}
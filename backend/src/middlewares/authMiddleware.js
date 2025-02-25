const jwt = require("jsonwebtoken");
const prisma = require("../../prisma/prismaClient");

const protect = async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await prisma.user.findUnique({where :{id:decoded.id}})
            if(!req.user){
                return res.status(401).json({error:"User not found"})

            }
            // console.log(decoded)
            return next(); 
        } catch (error) {
            return res.status(401).json({ error: "Not authorized, invalid token" });
        }
    } else {
        return res.status(401).json({ error: "Not authorized, no token" });
    }
};

const authorize = (...roles) =>{
    return(req,res,next) =>{
        if (!req.user || !roles.includes(req.user.role)){
            return res.status(403).json({error : "Forbidden: You do not have accesss"})
        }
        next()
    }
}

module.exports = { protect , authorize};

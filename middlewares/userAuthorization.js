const jwt = require("jsonwebtoken");

const verifyToken = async(req,res,next)=>{
    const token = req.cookies.access_token;

    if(!token){
        return res.status(400).json({errorMessage:"No Token Found"})
    }

    try {
        const secretKey = process.env.SECRET_KEY
        const verifiedToken = jwt.verify(token,secretKey)
        req.user = verifiedToken;
        res.status(200).json({message:"Valid Token"})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports = verifyToken;
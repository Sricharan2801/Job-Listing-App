const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {

    try {
        const token = req.cookies.access_token;

        if (!token) {
            return res.status(400).json({ errorMessage: "No Token Found" })
        }

        const secretKey = process.env.SECRET_KEY
        const verifiedToken = jwt.verify(token, secretKey)
        if(!verifiedToken) return res.status(401).json({message:"Invalid Token"})
        req.user = verifiedToken;
        req.body.userId = verifiedToken.userId;
        // res.status(200).json({ message: "Valid Token" })
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = verifyToken;
require("dotenv").config()
const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            const matchPassword = await bcrypt.compare(password, isUserExist.password);

            if (matchPassword) {
                const payLoad = {
                    userId: isUserExist._id,
                    email: isUserExist.email
                }
                const secretKey = process.env.SECRET_KEY
                const token = jwt.sign(payLoad, secretKey,{expiresIn:"2h"})
                res.cookie("access_token", token, {
                    httpOnly: true
                }).status(200).json({
                    message: "Login Sucessful",
                    token: token
                })
            } else {
                res.status(409).json({ errorMessage: "Incorrect password" })
            }

        } else {
            res.status(409).json({ errorMessage: "User Not Found" })
        }

    } catch (error) {
        res.status(500).json({ errorMessage: "Internal server error" })
    }
}

module.exports = Login;
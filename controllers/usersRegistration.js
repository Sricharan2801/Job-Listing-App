require("dotenv").config()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRegistration = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(500).json({ errorMessage: "Bad Request" })
        }

        const isEmailExist = await User.findOne({email:email});
        const isPhoneExist = await User.findOne({phone:phone});

        if(isEmailExist) return res.status(409).json({errorMessage:"Email already exist"});
        if(isPhoneExist) return res.status(409).json({errorMessage:"Phone Number already exist"})

        const hashedPassword = await bcrypt.hash(password, 10)

        const creatingUser = new User({ name, email, phone, password: hashedPassword })

        try {
            const savedUser = await creatingUser.save()
            const payLoad =  {
                userId: savedUser._id,
                email: savedUser.email
            }
            const secretKey = process.env.SECRET_KEY

            const token = jwt.sign(payLoad, secretKey,{expiresIn:"2h"})

            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json({
                message: "User Registered Sucessfully",
                token: token
            })

        } catch (error) {
            console.log(error);
            res.status(400).json({ errorMessage: "Error in user registration" })
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "Internal server error" })
    }
}

module.exports = userRegistration;


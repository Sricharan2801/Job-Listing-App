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

        const isUserExist = await User.findOne({ $or: [{ name }, { email }] });

        if (isUserExist) {
            switch (true) {
                case isUserExist.email === email:
                    return res.status(409).json({ message: "email already exist" });
                case isUserExist.phone === phone:
                    return res.status(409).json({ message: "phone number already exist" });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const creatingUser = new User({ name, email, phone, password: hashedPassword })

        try {
            const savedUser = creatingUser.save()
            const payLoad = await {
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
            res.status(400).json({ errorMessage: "Error in user registration" })
        }


    } catch (error) {
        res.status(500).json({ errorMessage: "Internal server error" })
    }
}

module.exports = userRegistration;


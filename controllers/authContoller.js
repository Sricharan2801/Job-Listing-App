const User = require("../models/User")

const Login = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body

        if (!name || !email || !phone || !password) {
            res.status(400).json({ errorMessage: "Bad Request" })
        }

        // checks whether the email exists or not and return's the boolean value
        const checkUserExists = await User.findOne({ email })

        if (checkUserExists) {


        } else {
            res.status(200).json("login sucessfull")
        }

    } catch (error) {
        res.status(500).json(`internal server error : ${error}`)
    }
}

module.exports = Login;
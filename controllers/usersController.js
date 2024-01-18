const User = require("../models/User")
const bcrypt = require("bcrypt")
const salt = 10;

const userRegistration = async (req, res) => {

    try {
        const { name, email, phone, password } = req.body

        // checks every field is filled or not
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ errorMessage: "Bad Request" })
        }

        // checks if user already exist
        const isUserExist = await User.findOne({$or:[{email},{phone}]})

        if (isUserExist) {
            switch (true) {
                case isUserExist.email === email:
                    return res.status(409).json({errorMessage:"Email already exists"});
                    break;
                case isUserExist.phone === phone:
                return res.status(409).json({errorMessage:"Phone number already exists"})
            }
        }

        // hashing the password
        const hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = new User({ name, email, phone, password: hashedPassword })

        try {
            createdUser.save()
            return res.status(200).json({message:"User registered sucessfully"})
        } catch (error) {
            return res.json({message:"Error in user registration"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "Internal server error" })
    }

}

module.exports = userRegistration;
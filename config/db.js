const mongoose = require("mongoose")
require("dotenv").config()

const databaseConnection = async () => {

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to database");
        return db
    } catch (err) {
         console.log(`error in connecting to database : ${err}`);
    }
}

module.exports = databaseConnection;


require("dotenv").config()
const mongoose = require("mongoose");

const databaseConnection = async()=>{
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"userData"
        })
        console.log("connected to database");
        return db
        
    } catch (error) {
        console.log("error in connecting to database");
    }     
}

module.exports = databaseConnection;
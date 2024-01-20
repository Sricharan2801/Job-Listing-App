require("dotenv").config
const express = require("express");
const databaseConnection = require("./config/db");
const userRoute = require("./routes/usersRoute");
const authRoute = require("./routes/authRoute");

const app = express();
const port = process.env.PORT || 7000

databaseConnection()
app.use(express.json());
app.use("/register",userRoute);
app.use("/login",authRoute)

app.get("/health",(req,res)=>{
    res.json({
        service:"job-listing server",
        status:"Active",
        time:new Date()
    })
})

app.listen(port,(err)=>{
    if(!err){
        console.log(`server is up and running on ${port} port`);
    }else{
        console.log(`error in running server : ${err}`);
    }
})

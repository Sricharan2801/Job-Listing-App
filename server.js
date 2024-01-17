const express = require("express");
const databaseConnection = require("./config/db")
require("dotenv").config

const app = express();
const port = process.env.PORT || 7000

databaseConnection()

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

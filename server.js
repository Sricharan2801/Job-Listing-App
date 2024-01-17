const express = require("express");
const app = express();
const env = require("dotenv").config
const port = process.env.PORT || 7000


app.listen(port,(err)=>{
    if(!err){
        console.log(`server is up and running on ${port} port`);
    }else{
        console.log(`error in running server : ${err}`);
    }
})

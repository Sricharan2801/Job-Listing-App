require("dotenv").config
const express = require("express");
const cookieParser = require("cookie-parser")
const databaseConnection = require("./config/db");
// routes
const userRegistrationRoute = require("./routes/userRegistrationRoute");
const userAuthRoute = require("./routes/userAuthRoute");
const jobsPostingRoute = require("./routes/jobsPostingRoute");
const jobsUpdateRoute = require("./routes/jobsUpdateRoute");
// middleWares
const verifyToken = require("./middlewares/userAuthorization")
const  {routeNotFound,errorHandler} = require("./middlewares/errorHandling")

const app = express();
const port = process.env.PORT || 7000

databaseConnection();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/register",userRegistrationRoute);
app.use("/api/v1/login",userAuthRoute);
app.use("/api/v1/createJob",jobsPostingRoute);
app.use("/api/v1/updateUser",jobsUpdateRoute);

app.get("/health",(req,res)=>{
    res.json({
        service:"job-listing server",
        status:"Active",
        time:new Date()
    })
})

app.use(routeNotFound);
app.use(errorHandler)

app.listen(port,(err)=>{
    if(!err){
        console.log(`server is up and running on ${port} port`);
    }else{
        console.log(`error in running server : ${err}`);
    }
})

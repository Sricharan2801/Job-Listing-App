const routeNotFound = (req,res,next)=>{
    const err = new Error("Something went wrong! Please try after some time");
    err.status = 404;
    next(err)
}

const errorHandler = (err,req,res,next)=>{
    res.status(err.status || 500).json({
        status:err.status || 500,
        message:err.message
    })
}

module.exports = {routeNotFound,errorHandler};
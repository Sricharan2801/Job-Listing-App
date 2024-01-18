const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({

})

const Jobs = mongoose.model("Jobs",jobsSchema);

module.exports = Jobs;
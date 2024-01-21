const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    addLogoUrl: {
        type: String,
        required: true
    },
    jobPosition: {
        type: String,
        required: true
    },
    monthlySalary: {
        type: Number,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    remoteOrOffice: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    aboutCompany: {
        type: String,
        required: true
    },
    skillsRequired: {
        type: String,
        required: true
    },
    information: {
        type: String,
        required: true
    },
})

const Jobs = mongoose.model("Jobs", jobsSchema);

module.exports = Jobs;
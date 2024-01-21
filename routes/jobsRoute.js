const express = require("express");
const createJob = require("../controllers/jobsController")
const router = express.Router();

router.post("/",createJob)

module.exports = router;
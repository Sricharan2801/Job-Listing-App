const express = require("express");
const createJob = require("../controllers/jobsPosting");
const router = express.Router();

router.post("/",createJob)

module.exports = router;
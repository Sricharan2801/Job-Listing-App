const express = require("express");
const updateUser = require("../controllers/jobsUpdate")
const router = express.Router();

router.post("/:jobId",updateUser);

module.exports = router;
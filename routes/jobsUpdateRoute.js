const express = require("express");
const updateUser = require("../controllers/jobsUpdate")
const router = express.Router();

router.post("/:userId",updateUser);

module.exports = router;
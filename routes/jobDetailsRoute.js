const express = require("express");
const {getUserDetailsById,getAllJobDetails} = require("../controllers/getJobDetails");
const router = express.Router();

router.get("/allJobs",getAllJobDetails);
router.get("/:jobId",getUserDetailsById);


module.exports = router;
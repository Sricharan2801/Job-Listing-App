const express = require("express");
const userRegistration = require("../controllers/usersRegistration")
const router = express.Router();

router.post("/",userRegistration)

module.exports = router;
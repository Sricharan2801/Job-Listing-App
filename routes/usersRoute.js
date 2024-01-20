const express = require("express");
const userRegistration = require("../controllers/usersController")
const router = express.Router();

router.post("/",userRegistration)

module.exports = router;
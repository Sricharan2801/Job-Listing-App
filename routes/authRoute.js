const express = require("express");
const Login = require("../controllers/authContoller")
const router = express.Router();

router.post("/",Login);

module.exports = router;
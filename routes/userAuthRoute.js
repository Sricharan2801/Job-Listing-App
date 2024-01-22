const express = require("express");
const Login = require("../controllers/usersAuthentication")
const router = express.Router();

router.post("/",Login);

module.exports = router;
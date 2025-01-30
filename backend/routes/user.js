const express = require("express");
const { signUp } = require("../controllers/User/signUp");
const { login } = require("../controllers/User/loginIn");
const {getProfile}=require('../controllers/User/profiles')

const router = express.Router();

// Sign up route
router.post("/signup", signUp);
router.post("/login", login);
 router.post("/profiles", getProfile);

module.exports = router;

const express = require("express");
const { handleUserSignup , handleUserLogin } = require("../controllers/user.js");

const router = express.Router();

router.use("/signup",handleUserSignup);

router.use("/login",handleUserLogin);
module.exports = router;
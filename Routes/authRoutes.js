const express = require("express");
const {signup} = require("./../Controllers/authController");
const router = express.Router();

router.route("/sign-up").post(signup);


module.exports = router;
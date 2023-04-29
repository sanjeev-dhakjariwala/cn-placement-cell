const express = require("express");
const router = express.Router();
const { homePage } = require("../controllers/home.controller");
router.route("/").get(homePage);

module.exports = router;

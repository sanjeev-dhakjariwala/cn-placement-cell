const express = require("express");
const { registerEmployee } = require("../controllers/employee.auth.controller");

const router = express.Router();

router.route("/").post(registerEmployee);

module.exports = router

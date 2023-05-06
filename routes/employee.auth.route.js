const express = require("express");
const {
  registerEmployee,
  signIn,
} = require("../controllers/employee.auth.controller");

const router = express.Router();

router.route("/").post(registerEmployee);
router.route("/sign_in").post(signIn);

module.exports = router;

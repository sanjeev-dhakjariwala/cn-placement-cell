const express = require("express");
const {
  registerEmployee,
  signIn,
  signOut,
} = require("../controllers/employee.auth.controller");

const router = express.Router();

router.route("/").post(registerEmployee);
router.route("/sign_in").post(signIn);
router.route("/sign_out").post(signOut);

module.exports = router;

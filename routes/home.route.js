const express = require("express");
const router = express.Router();
const {
  homePage,
  signUpPage,
  signUp,
} = require("../controllers/home.controller");
const { signOut } = require("../controllers/employee.auth.controller");
router.route("/").get(homePage);
router.route("/signUp").get(signUpPage);
router.route("/create_session").post(signUp);
router.route("/sign_out").get(signOut);

module.exports = router;

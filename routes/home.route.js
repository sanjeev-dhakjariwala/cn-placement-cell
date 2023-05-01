const express = require("express");
const router = express.Router();
const {
  homePage,
  signUpPage,
  signUp,
  signIn,
} = require("../controllers/home.controller");
router.route("/").get(homePage);
router.route("/signUp").get(signUpPage);
router.route("/create_session").post(signUp);
router.route("/sign_in").post(signIn);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  homePage,
  signUpPage,
  signUp,
} = require("../controllers/home.controller");
router.route("/").get(homePage);
router.route("/signUp").get(signUpPage);
router.route("/create_session").post(signUp);
router.use("/employee", require("./employee.dashboard.route"));

module.exports = router;

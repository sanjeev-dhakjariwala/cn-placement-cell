const express = require("express");
const router = express.Router();
const {
  interviewPage,
  interviewForm,
  interviewAllocation,
} = require("../controllers/interview.controller");

router.route("/interview_list").get(interviewPage);
router.route("/:id").get(interviewForm);
router.route("/interview_allocation").post(interviewAllocation);

module.exports = router;

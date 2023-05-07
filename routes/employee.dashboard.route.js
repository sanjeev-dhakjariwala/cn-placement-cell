const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const {
  dashboard,
  addStudent,
  addStudentPage,
  downloadData,
} = require("../controllers/employee.dashboard.controller");
const router = express.Router();

router.route("/dashboard").get(protect, dashboard);
router.route("/student").get(addStudentPage);
router.route("/addStudent").post(addStudent);
router.route("/download").get(downloadData);

module.exports = router;

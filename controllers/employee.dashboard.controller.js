const asyncHandler = require("express-async-handler");
const validator = require("validator");
const Student = require("../models/Student.js");
const Interview = require("../models/Interview.js");
const Result = require("../models/Result.js");
const fs = require("fs");

//Employee DashboardList
const dashboard = asyncHandler(async (req, res) => {
  const studentList = await Student.find({});
  return res.render("employeeDashboard", {
    title: "EmployeeDashboard",
    studentList: studentList,
  });
});

//Render Student Page
const addStudentPage = asyncHandler(async (req, res) => {
  return res.render("addStudent", {
    title: "Student",
  });
});

//Add student logic
const addStudent = asyncHandler(async (req, res) => {
  try {
    if (!validator.isEmail(req.body.email)) {
      req.flash("error", "Enter valid Email!!");
      return res.redirect("back");
    } else {
      const presentStudent = await Student.findOne({ email: req.body.email });
      if (presentStudent) {
        req.flash("error", "Student already present!");
        return res.redirect("back");
      } else {
        const addStudent = await Student.create(req.body);
        req.flash("success", "Student added successfully!!");
        return res.redirect("/employee/dashboard");
      }
    }
  } catch (err) {
    return res.send("Error in adding student");
  }
});

module.exports = { dashboard, addStudentPage, addStudent };

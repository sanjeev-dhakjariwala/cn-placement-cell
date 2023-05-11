const Student = require("../models/Student");
const Interview = require("../models/Interview");
const asyncHandler = require("express-async-handler");

const interviewPage = asyncHandler(async (req, res) => {
  const studentList = await Student.find({});
  const interviewList = await Interview.find({});
  return res.render("interview", {
    title: "Interview List",
    studentList: studentList,
    interview_list: interviewList,
  });
});

const interviewForm = asyncHandler(async (req, res) => {
  return res.render("formForInterviewAllocation", {
    title: "Interview Allocation",
    id: req.params.id,
  });
});

const interviewAllocation = asyncHandler(async (req, res) => {
  try {
    const companyCheck = await Interview.findOne({
      companyName: req.body.companyName,
    });
    if (companyCheck) {
      const id = req.body.studentID;
      const studentPresent = await Student.findById(id);
      const index = studentPresent.interviews.indexOf(companyCheck.id);
      if (index === -1) {
        studentPresent.interviews.push(companyCheck.id);
        await studentPresent.save();
      }
      //interview table
      const cindex = companyCheck.students.indexOf(studentPresent.id);
      if (cindex === -1) {
        companyCheck.students.push(studentPresent.id);
        await companyCheck.save();
      }
    } else {
      const company = await Interview.create({
        companyName: req.body.companyName,
        date: req.body.date,
      });
      const id = req.body.studentID;
      const studentPresent = await Student.findById(id);
      const index = studentPresent.interviews.indexOf(company.id);
      if (index === -1) {
        studentPresent.interviews.push(company.id);
        await studentPresent.save();
      }
      const cindex = company.students.indexOf(studentPresent.id);
      if (cindex === -1) {
        company.students.push(studentPresent.id);
        await company.save();
      }
    }

    req.flash("success", "Interview Allocate To Student SuccessFully !!");
    return res.redirect("/employee/dashboard");
  } catch (error) {
    return res.send("Error in allocating interview");
  }
});

module.exports = {
  interviewPage,
  interviewForm,
  interviewAllocation,
};

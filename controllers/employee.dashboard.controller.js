const asyncHandler = require("express-async-handler");
const convertor = require("objects-to-csv");
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

//Download CSV
const downloadData = async function (req, res) {
  const studentList = await Student.find({});
  const dataPresent = [];
  for (let i = 0; i < studentList.length; i++) {
    const student = studentList[i];
    for (let j = 0; j < student.interviews.length; j++) {
      const id = student.interviews[j];
      const interviewData = await Interview.findById(id);
      //find result
      let result = "On Hold";
      const resultIndex = interviewData.result.indexOf(student.id);
      if (resultIndex != -1) {
        const resultData = await Result.find({
          studentId: interviewData.result[resultIndex],
        });
        for (let k = 0; k < resultData.length; k++) {
          if (resultData[k].interviewId == interviewData.id) {
            result = resultData[k].result;
            break;
          }
        }
      }
      const list = {
        StudentId: student.id,
        Batch: student.batch,
        Name: student.name,
        Email: student.email,
        Status: student.status,
        College: student.college,
        DSA: student.DSA_FinalScore,
        WEBD: student.WebD_FinalScore,
        REACT: student.React_FinalScore,
        CompanyName: interviewData.companyName,
        InterviewDate: interviewData.date.toString().substring(4, 15),
        Result: result,
      };
      dataPresent.push(list);
    }
  }

  const csv = new convertor(dataPresent);
  await csv.toDisk("./studentData.csv");
  return res.download("./studentData.csv", () => {
    //for deleting file
    fs.unlinkSync("./studentData.csv");
  });
};

module.exports = { dashboard, addStudentPage, addStudent, downloadData };

const asyncHandler = require("express-async-handler");
const Student = require("../models/Student");
const Result = require("../models/Result");
const Interview = require("../models/Interview");

const resultPage = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const companyResult = await Interview.findById(id).populate("students");
  return res.render("result", {
    title: "Result",
    companyResult: companyResult,
  });
});

const update = asyncHandler(async (req, res) => {
  try {
    const updateResult = await Result(req.body);
    await updateResult.save();
    const id = req.body.interviewId;
    const interviewResult = await Interview.findById(id);
    const index = interviewResult.result.indexOf(req.body.studentId);
    if (index === -1) {
      interviewResult.result.push(req.body.studentId);
      await interviewResult.save();
    }
    if (req.body.result === "PASS") {
      const studentId = req.body.studentId;
      const studentPresent = await Student.findById(studentId);
      studentPresent.status = "placed";
      await studentPresent.save();
      req.flash("success", "Status Updated !!");
    }
    req.flash("success", "Result Updated !!");
    return res.redirect("back");
  } catch (error) {
    return res.send("Error in updating data");
  }
});

module.exports = {
  resultPage,
  update,
};

const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  result: {
    type: String,
    enum: ["Pass", "Fail", "On Hold", "Did not attempt"],
    default: "ON HOLD",
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interview",
  },
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;

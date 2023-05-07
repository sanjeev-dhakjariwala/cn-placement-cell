const mongoose = require("mongoose");

//Defining Result Schema
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

//Defining Result Model
const Result = mongoose.model("Result", resultSchema);

module.exports = Result;

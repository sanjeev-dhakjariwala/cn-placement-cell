const mongoose = require("mongoose");

//Defining Interview Schema
const interviewSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    result: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Result",
      },
    ],
  },
  {
    timestamps: true,
  }
);
//Defining Interview Model
const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;

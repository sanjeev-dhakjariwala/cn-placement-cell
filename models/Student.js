const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    batch: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["placed", "not_placed"],
      default: "not_placed",
    },
    DSA_FinalScore: {
      type: Number,
      default: 0,
    },
    WebD_FinalScore: {
      type: Number,
      default: 0,
    },
    React_FinalScore: {
      type: Number,
      default: 0,
    },
    interview: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Interview",
      },
    ],
  },
  { timestamps: true }
);

const Student = mongoose.Model("Student", studentSchema);

module.exports = Student;
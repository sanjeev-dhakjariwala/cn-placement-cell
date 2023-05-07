const mongoose = require("mongoose");

//Defining Student Schema
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
      default: "not placed",
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
    interviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Interview",
      },
    ],
  },
  { timestamps: true }
);

//Defining Student Model
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

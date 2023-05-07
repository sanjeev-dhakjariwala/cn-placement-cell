const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Defining Employee Schema
const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

employeeSchema.methods.matchPassword = async function (enteredPassword) {
  try{
    const match = await bcrypt.compare(enteredPassword, this.password);
    return match;
  }catch(error){
    return false;
  }
  
};
employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//Defining Employee Model
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;

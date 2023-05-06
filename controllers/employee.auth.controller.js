const Employee = require("../models/Employee");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const registerEmployee = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const employeeExists = await Employee.findOne({ email });

  if (employeeExists) {
    res.status(400);
    throw new Error("Employee already exists!");
  }

  const employee = await Employee.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (employee) {
    res.status(201);
    res.send({
      success: true,
      email: employee.email,
      token: generateToken(employee._id),
    });
  } else {
    res.status(400);
    res.send({
      success: false,
      message: "Invalid employee data",
    });
  }
});
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });
    if (employee && (await employee.matchPassword(password))) {
      res.cookie("employee", employee, {
        httpOnly: true, // make the cookie accessible only to the server
      });
      res.redirect("/employee/dashboard");
    }
  } catch (error) {
    return res.send("<h1>Error in SignIn</h1>");
  }
};
module.exports = { registerEmployee, signIn };

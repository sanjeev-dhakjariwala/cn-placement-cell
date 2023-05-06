const Employee = require("../models/Employee");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

//Employee register route
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
      token: "Bearer " + generateToken(employee._id),
    });
  } else {
    res.status(400);
    res.send({
      success: false,
      message: "Invalid employee data",
    });
  }
});

//Employee signIn route
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });
    if (employee && (await employee.matchPassword(password))) {
      const token = "Bearer " + generateToken(employee._id);
      res.cookie("token", token, {
        httpOnly: true, // make the cookie accessible only to the server
      });
      req.flash("success", "Sign In SuccessFully");
      return res.redirect("/employee/dashboard");
      // res.send({
      //   success: true,
      //   token: token,
      // });
    } else {
      req.flash("error", "Email or Password Incorrect!");
      return res.redirect("/");
    }
  } catch (error) {
    return res.send("<h1>Error in SignIn</h1>");
  }
};

//Employee SignOut route
const signOut = asyncHandler(async (req, res) => {
  req.flash("success", "SignOut successfull!");
  res.clearCookie("token");
  return res.redirect("/");
});

module.exports = { registerEmployee, signIn, signOut };

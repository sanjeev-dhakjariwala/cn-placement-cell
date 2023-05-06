const Employee = require("../models/Employee.js");
const validator = require("validator");
const generateToken = require("../utils/generateToken.js");
const asyncHandler = require("express-async-handler");

const homePage = asyncHandler(async (req, res) => {
  res.render("signIn", {
    title: "Sign In",
  });
});

const signUpPage = asyncHandler(async (req, res) => {
  res.render("signUp", {
    title: "SignUp",
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
  });
});

const signUp = asyncHandler(async (req, res) => {
  try {
    if (req.body.firstName.length === 0) {
      return res.render("signUp", {
        title: "Sign Up",
        firstNameError: "First Name cannot be blank",
        lastNameError: "",
        emailError: "",
        passwordError: "",
      });
    } else if (!isNaN(req.body.firstName)) {
      return res.render("signUp", {
        title: "Sign Up",
        firstNameError: "First Name cannot be a number",
        lastNameError: "",
        emailError: "",
        passwordError: "",
      });
    } else if (req.body.lastName.length === 0) {
      return res.render("signUp", {
        title: "Sign Up",
        firstNameError: "",
        lastNameError: "Last Name cannot be empty",
        emailError: "",
        passwordError: "",
      });
    } else if (!isNaN(req.body.lastName)) {
      return res.render("signUp", {
        title: "Sign Up",
        firstNameError: "",
        lastNameError: "Last Name cannot be a number",
        emailError: "",
        passwordError: "",
      });
    } else if (!validator.isEmail(req.body.email)) {
      req.flash("error", "");
      return res.render("signUp", {
        title: "Sign Up",
        firstNameError: "",
        lastNameError: "",
        emailError: "Please Enter Valid Email",
        passwordError: "",
      });
    } else if (req.body.password.length < 2) {
      return res.render("signUp", {
        title: "Sign Up",
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordError: "Password is Small!!",
      });
    } else {
      const employeePresent = await Employee.findOne({ email: req.body.email });
      if (employeePresent) {
        req.flash("error", "Employee Already Exist !!");
        return res.redirect("/");
      } else {
        const registerEmployee = await Employee(req.body);
        registerEmployee.save();
        req.flash("success", "Sign Up SuccessFully !!");
        return res.redirect("/");
      }
    }
  } catch (error) {
    return res.send("<h1>Error in SignUp</h1>");
  }
});


module.exports = { homePage, signUpPage, signUp};

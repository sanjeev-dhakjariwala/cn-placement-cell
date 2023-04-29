const Employee = require("../models/Employee.js");
const asyncHandler = require("express-async-handler");

const homePage = asyncHandler(async (req, res) => {
    res.render("signIn", {
        title: "Sign In"
    })
});

module.exports = {homePage}

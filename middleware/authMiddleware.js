const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Employee = require("../models/Employee");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req?.headers?.authorization &&
    req?.headers?.authorization.startsWith("Bearer")
  ) {
    try {
      token = req?.headers?.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.employee = await Employee.findByID(decoded.id);
    } catch (err) {
      console.error(err);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
});

module.exports = protect


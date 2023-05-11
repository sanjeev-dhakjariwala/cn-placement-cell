const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressLayout = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const app = express();
const cors = require("cors");
const { notFound, errorHandler } = require("../middleware/errMiddleware");
const employeeAuthRouter = require("../routes/employee.auth.route");
const homePageRouter = require("../routes/home.route");
const employeeRouter = require("../routes/employee.dashboard.route");
const resultRouter = require("../routes/result.route");
const interviewRouter = require("../routes/interview.route");

//Using express.json() to take JSON as input in request body
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
//Applying CORS Policy
app.use(cors());
//Using cookie parser to store token that we get when we signup and login
app.use(cookieParser());

//Applying the static assests
app.use(express.static("./assets"));
app.use(
  session({
    name: "placementCell",
    secret: process.env.secret_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60,
    }),
  })
);
//Setting view engine as EJS
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(expressLayout);
//Using flash to display info
app.use(flash());
app.use(function (req, res, next) {
  res.locals.flash = {
    success: req.flash("success"),
    error: req.flash("error"),
  };
  next();
});
//Adding the neccessary routes
app.use("/api/register", employeeAuthRouter);
app.use("/employee", employeeRouter);
app.use("/student", interviewRouter);
app.use("/result", resultRouter);
app.use("/", homePageRouter);

//Adding error middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = app;

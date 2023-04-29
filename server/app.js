const express = require("express");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require('express-session');
const mongoStore = require('connect-mongo');
const app = express();
const cors = require("cors");
const { notFound, errorHandler } = require("../middleware/errMiddleware");
const employeeAuthRouter = require("../routes/employee.auth.route");
const homePage = require("../routes/home.route");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("./assets"));
app.use(session({
  name: 'placementCell',
  secret: process.env.secret_key,
  saveUninitialized: false,
  resave: false,
  cookie: {
      maxAge: (1000 * 60 * 100)
  },
  store:mongoStore.create({
      mongoUrl :process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60
  })
  }

));

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(expressLayout);
app.use(flash());
app.use(function (req, res, next) {
  res.locals.flash = {
    success: req.flash("success"),
    error: req.flash("error"),
  };
  next();
});

app.use("/api/register", employeeAuthRouter);
app.use("/", homePage);
app.get("/", (req, res) => {
  res.send(`APP IS WORKING!!!`);
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;

const express = require("express");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const app = express();
const cors = require("cors");
const { notFound, errorHandler } = require("../middleware/errMiddleware");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("./assets"));

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(expressLayout);

app.get("/", (req, res) => {
  res.send(`APP IS WORKING!!!`);
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;

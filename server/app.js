const express = require("express");
const app = express();
const cors = require("cors");
const { notFound, errorHandler } = require("../middleware/errMiddleware");

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.get("/", (req, res) => {
  res.send(`APP IS WORKING!!!`);
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;

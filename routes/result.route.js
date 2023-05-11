const express = require("express");
const router = express.Router();
const { resultPage, update } = require("../controllers/result.controller");

router.route("/:id").get(resultPage);
router.route("/update").post(update);

module.exports = router;

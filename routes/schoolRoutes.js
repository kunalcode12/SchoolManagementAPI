const express = require("express");
const schoolController = require("../controller/schoolController");

const router = express.Router();
router.route("/").post(schoolController.addSchool);

module.exports = router;

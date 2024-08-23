const express = require("express");
const schoolController1 = require("../controller/schoolController");

const router = express.Router();

router.route("/:latlng/unit/:unit").get(schoolController1.getSortedSchools);

router.route("/").get(schoolController1.getAllSchools);

module.exports = router;

const express = require("express");
const { model } = require("mongoose");
const router = express.Router()
const collegeController = require("../controller/collegeController")
const internController = require("../controller/internController")
router.post("/functionup/colleges", collegeController.createCollege)
router.post("/functionup/interns",internController.createInterns)
router.get("/funtionup/collegeDetails",internController.collegeDetails)
module.exports = router;
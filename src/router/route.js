const express = require("express");
const router = express.Router()

const collegeController = require("../controller/collegeController")
const internController = require("../controller/internController")

// <<<<<<<<<<<<<<<<<<<<< Routers >>>>>>>>>>>>>>>>>>>>>>>

router.post("/functionup/colleges", collegeController.createCollege) 

router.post("/functionup/interns",internController.createInterns)

router.get("/functionup/collegeDetails",internController.collegeDetails)

module.exports = router;
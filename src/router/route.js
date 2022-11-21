const express = require("express");
const { model } = require("mongoose");
const router = express.Router()
const collegeController = require("../controller/collegeController")
const internController = require("../controller/internController")
router.post("/functionup/colleges", collegeController.createCollege)
router.post("/functionup/interns",internController.createInterns)


// router.all("/*", function (req, res) {
//     res.status(404).send({ msg: "invalid http request" })
// })
module.exports = router;
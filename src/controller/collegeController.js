const collegemodel = require("../model/collegeModel");
const jwt = require("jsonwebtoken");
const isValidHttpUrl = require("is-valid-http-url");
const collegeModel = require("../model/collegeModel");
const createCollege = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "please enter college details" })
        }
        let { name, fullName, logoLink } = data 

        function isValidname(fullName){return (typeof firstname !== "string" ||/^([a-zA-Z'-.]+ [a-zA-Z'-.]+)$/.test(fullName))?true:false}
        function upperCase(string){return string.replace(string[0], string[0].toUpperCase())}

        if (!name) {
            return res.status(400).send({ status: false, msg: "name is required" })
        }
        if (!fullName) {
            return res.status(400).send({ status: false, msg: "full name  is required" })
        }
        if (!logoLink) {
            return res.status(400).send({ status: false, msg: "logo is required" })
        }

        if (!isValidname(name)) {
            return res.status(400).send({ status: false, msg: "please enter valid name" })
        }
        if (!isValidname(fullName)) {
            return res.status(400).send({ status: false, msg: "please enter a valid full name" })
        }
        if (!isValidHttpUrl(logoLink)) {
            return res.status(400).send({ status: false, msg: "please enter a valid  logo link" })
        }
        let result = await collegeModel.create(data)
        res.status(201).send({ status: true, data: result })


    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports.createCollege = createCollege
const { isValidObjectId } = require('mongoose')
const collegeModel = require('../model/collegeModel')
const internModel = require('../model/internModel')
const createInterns = async function (req, res) {
    try {
        const internData = req.body
        const { name, email, mobile, collegeId } = internData
        if (Object.keys(internData).length == 0) {
            return res.status(400).send({ status: false, msg: "please enter intern details" })
        }


        if (!name) {
            return res.status(400).send({ status: false, msg: "please provide name" })
        }

        if (!(/^[a-zA-Z]+((',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name))) {
            return res.status(400).send({ status: false, message: "valid name is required" })
        }

        if (!email) {
            return res.status(400).send({ status: false, msg: "please provide email id" })
        }

        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
            return res.status(400).send({ status: false, msg: "enter valid email" })
        }

        let checkemail = await internModel.findOne({ email })
        if (checkemail) {
            return res.status(400).send({ status: false, msg: "email is already taken" })
        }

        if (!mobile) {
            return res.status(400).send({ status: false, msg: "please provide mobile number" })
        }

        if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)) {
            return res.status(400).send({ status: false, msg: "enter valid mobile number" })
        }


        if (!collegeId) {
            return res.status(400).send({ status: false, msg: "please provide college id" })
        }

        if (!isValidObjectId(collegeId)) {
            return res.status(400).send({ status: false, msg: "please enter valid college id" })
        }

        let result = await internModel.create(internData)
        return res.status(201).send({ status: true, data: result })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.createInterns = createInterns
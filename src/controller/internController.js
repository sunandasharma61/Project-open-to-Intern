const internModel = require('../model/internModel')
const collegeModel = require("../model/collegeModel");

//----------------------Create Interns Api-------------------------
const createInterns = async function (req, res) {
    try {

        const internData = req.body
        const { name, email, mobile } = internData  //destructuring 

        //-------------------------for empty respone-------------------------
        if (Object.keys(internData).length == 0) {
            return res.status(400).send({ status: false, msg: "please enter intern's details" })
        }

        //--------------------------for no name given----------------------------
        if (!name) {
            return res.status(400).send({ status: false, msg: "please provide intern's name" })
        }

        //--------------------------for name in alphabet only---------------------
        if (!(/^[a-zA-Z ]+$/.test(name))) {
            return res.status(400).send({ status: false, msg: "intern's name should be in alphabets" })
        }

        //----------------------------for no email given-------------------------
        if (!email) {
            return res.status(400).send({ status: false, msg: "please provide intern's email id" })
        }

        //---------------------------for valid email---------------------------

        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
            return res.status(400).send({ status: false, msg: "enter valid intern's email" })
        }

        //---------------------------for same email given----------------------------

        let checkemail = await internModel.findOne({ email: email })
        if (checkemail) {
            return res.status(400).send({ status: false, msg: "email is already taken" })
        }

        //----------------------------for no mobile number given----------------------
        if (!mobile) {
            return res.status(400).send({ status: false, msg: "please provide intern'smobile number" })
        }

        //-----------------------------for same mobile number given-------------------------  
        let mob = await internModel.findOne({ mobile: mobile })
        if (mob) {
            return res.status(400).send({ status: false, msg: "phone number is already taken" })
        }

        //----------------------------for invalid format of number----------------------------
        if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)) {
            return res.status(400).send({ status: false, msg: "enter valid mobile number" })
        }

        //-------------------------------for assigning collegeID---------------------------
        let dataByCollege = await collegeModel.findOne({ name: req.body.collegeName })
        if (!dataByCollege) { return res.status(400).send({ status: false, message: "There is no intern with this college name" }) }

        req.body.collegeId = dataByCollege._id

        let result = await internModel.create(internData)
        return res.status(201).send({ status: true, data: result })

    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

//--------------------------<Get Interns Api>-------------------

const collegeDetails = async function (req, res) {
    try {

        //---------------------------------for empty response------------------------------------
        const CollegeName = req.query.collegeName;
        if (!CollegeName) {
            return res.status(404).send({ status: false, msg: "CollegeName is required" });
        }

        //---------------------------------for no data matching------------------------------
        const collegeData = await collegeModel.findOne({ name: CollegeName })
        if (!collegeData) {
            return res.status(404).send({ status: false, msg: "No such college are present" })
        }

        //----------------------------------for finding interns-------------------------------
        let findintern = await internModel.find({ collegeId: collegeData._id }).select({ name: 1, email: 1, mobile: 1, _id: 1 })
        
        const data = {
            name: collegeData.name,
            fullName: collegeData.fullName,
            logoLink: collegeData.logoLink,
            interns: findintern
        }
        res.status(200).send({ status: true, data: data });

    }

    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }

};

module.exports = { createInterns, collegeDetails };



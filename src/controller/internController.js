const internModel = require('../model/internModel')

const collegeModel = require("../model/collegeModel");


//<<<<<<<<<<<<<<<< Create Interns Api >>>>>>>>>>>>>>>>>>> 


const createInterns = async function (req, res) {
    
    try {
        const internData = req.body
        const { name, email, mobile } = internData
        
        if (Object.keys(internData).length == 0) {
            return res.status(400).send({ status: false, msg: "please enter intern details" })
        }

//.....................................................................................................................................

        if (!name) {
            return res.status(400).send({ status: false, msg: "please provide name" })
        }

//.....................................................................................................................................

        if (!(/^[a-zA-Z ]+$/.test(name))){
            return res.status(400).send({status:false,msg:"name should be in alphabets"})
        }

//.....................................................................................................................................

        if (!email) {
            return res.status(400).send({ status: false, msg: "please provide email id" })
        }

//.....................................................................................................................................

        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
            return res.status(400).send({ status: false, msg: "enter valid email" })
        }

//.....................................................................................................................................

        let checkemail = await internModel.findOne({ email:email })
        if (checkemail) {
            return res.status(400).send({ status: false, msg: "email is already taken" })
        }

//.....................................................................................................................................

        if (!mobile) {
            return res.status(400).send({ status: false, msg: "please provide mobile number" })
        }

//.....................................................................................................................................        

        if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)) {
            return res.status(400).send({ status: false, msg: "enter valid mobile number" })
        }

//.....................................................................................................................................        

        let dataByCollege = await collegeModel.findOne({name:req.body.collegeName})
        if(!dataByCollege){return res.status(400).send({status:false, message:"There is no intern with this college name"})} 

//.....................................................................................................................................

        req.body.collegeId = dataByCollege._id       
       
        let result = await internModel.create(internData)
        return res.status(201).send({ status: true, data: result })

//.....................................................................................................................................    
    
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


//<<<<<<<<<<<<<< Get Interns Api >>>>>>>>>>>>>>>>>>


const collegeDetails = async function (req, res) {
    try {
      const CollegeName = req.query.collegeName;
      if (!CollegeName) {return res.status(404).send({ status: false, msg: "CollegeName is required" });}
  
//.....................................................................................................................................

      const collegeData = await collegeModel.findOne({ name: CollegeName })
      if (collegeData.length == 0) return res.status(404).send({ status: false, msg: "No such college are present" })
  
//.....................................................................................................................................

      let findintern = await internModel.find({ collegeId: collegeData._id })
    
//.....................................................................................................................................
      
      const data = {
        name: collegeData.name,
        fullName: collegeData.fullName,
        logoLink: collegeData.logoLink,
        interns: findintern
      }
      res.status(200).send({ status: true, data: data });

//.....................................................................................................................................

    } catch (err) {
      res.status(500).send({ status: false, msg: err.message });
    }
  };
  
  module.exports = { createInterns, collegeDetails };



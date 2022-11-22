const collegeModel = require("../model/collegeModel");

//<<<<<<<<<<<<<<<<<<< Create College Api >>>>>>>>>>>>>>>>>>>>>>

const createCollege = async function (req, res) {
    
    try {
        let data = req.body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "please enter college details" })
        }
        let { name, fullName, logoLink } = data

//.....................................................................................................................................
      
        if (!name) 
        {
            return res.status(400).send({ status: false, msg: "name is required" })  //for no entry
        } 
        
//.....................................................................................................................................

        if (! /^[a-zA-Z]+$/.test(name))
        {
            return res.status(400).send({status:false,msg:"name should be in alphabets"}) //for alphabets only
        }

//.....................................................................................................................................
      
        if (name.indexOf(" ") >= 0)
        {
            return res.status(400).send({ status: false, msg: "College name should not have space." }) //for space between letters
        }
        
//.....................................................................................................................................        
        
        let findName = await collegeModel.findOne({name:name})
        if(findName){
            return res.status(400).send({status:false,msg:"Name is already taken"}) //already taken name
        }

//.....................................................................................................................................        

        if (!fullName) {
            return res.status(400).send({ status: false, msg: "full name is required" }) //for empty entry
        }

//.....................................................................................................................................

        if (!(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(fullName))) {   //for alphabetic orders
            return res.status(400).send({ status: false, message: "valid full name is should contain Alphabets" })
        }

//.....................................................................................................................................

        let findcollgeName = await collegeModel.findOne({fullName:fullName})
        if(findcollgeName){
            return res.status(400).send({status:false,msg:"College full name is already taken"})
        }

//.....................................................................................................................................

        if (!logoLink) {
            return res.status(400).send({ status: false, msg: "logo is required" })
        }

//.....................................................................................................................................

        if (!(/https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/i.test(logoLink))) {
            return res.status(400).send({ status: false, message: "Logolink is not in correct format" })
        }

//.....................................................................................................................................       

        const find = await collegeModel.findOne(data)
        if (find) {
            return res.status(400).send({ status: false, msg: "Do not create college,name is already taken" })
        } else {
            let result = await collegeModel.create(data)
            res.status(201).send({ status: true, data: result })
        }

//.....................................................................................................................................        
   
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports.createCollege = createCollege
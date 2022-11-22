const collegeModel = require("../model/collegeModel");

//-------------------------<Create College Api>------------------------
const createCollege = async function (req, res) {
    try {
        //---------------------------For No Entry-----------------------
        let data = req.body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "please enter college details" })
        }
        let { name, fullName, logoLink } = data

        //------------------------------For No Name--------------------------
        if (!name) {
            return res.status(400).send({ status: false, msg: "name is required" })
        }

        //----------------------------for alphabets only--------------------------------

        if (! /^[a-z ]+$/.test(name)) {
            return res.status(400).send({ status: false, msg: "name should be in alphabets" })
        }

        //--------------------------for space between letters--------------------------

        if (name.indexOf(" ") >= 0) {
            return res.status(400).send({ status: false, msg: "Name should not have space" })
        }

        //--------------------------------Already taken name------------------------------      
        let findName = await collegeModel.findOne({ name: name })
        if (findName) {
            return res.status(400).send({ status: false, msg: "Name is already taken" })
        }

        //--------------------------------For empty entry----------------------------------
        if (!fullName) {
            return res.status(400).send({ status: false, msg: "Full name is required" })
        }

        //------------------------------for alphabetic orders-----------------------------
        if (!(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(fullName))) {
            return res.status(400).send({ status: false, message: "valid full name should contain Alphabets" })
        }

        //--------------------------------for Same Name------------------------------
        let findcollgeName = await collegeModel.findOne({ fullName: fullName })
        if (findcollgeName) {
            return res.status(400).send({ status: false, msg: "College full name is already taken" })
        }

        //-------------------------------for empty Logolink----------------------------------
        if (!logoLink) {
            return res.status(400).send({ status: false, msg: "logo is required" })
        }

        //-----------------------------for invalid logo link------------------------------------

        if (!(/https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/i.test(logoLink))) {
            return res.status(400).send({ status: false, message: "Logolink is invalid , please enter valid logolink" })
        }

        //-------------------------------for creating College---------------------------
        let result = await collegeModel.create(data)
        res.status(201).send({ status: true, data: result })

    }

    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports.createCollege = createCollege
const mongoose=require ("mongoose")
const id = mongoose.Schema.Types.ObjectId
const internSchema = new mongoose.Schema({

name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
mobile:{
    type:Number,
    required :true
},
collegeId:{
    type:id,
    ref:"college",
    required:true
},
isDeleted:{
    type:Boolean,
    default:false
}

},{timestamps:true})

module.exports = mongoose.model('intern',internSchema)

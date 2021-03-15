var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    name:String,
    dob:String,
    admissionYear:Number,
    branch:String,
    regNo:{
        type:String,
        unique:true

    },
    sem:Number,
    password:String,
    gender:String,
    collegeCode:String,
})

mongoose.model('student',studentSchema);
module.exports = mongoose.model('student');
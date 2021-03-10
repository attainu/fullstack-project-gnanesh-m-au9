var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    name:String,
    dob:Date,
    admissionYear:Number,
    branch:String,
    regNo:String,
    sem:Number,
    password:String,
    gender:String,
    collegeCode:String,
})

mongoose.model('student',studentSchema);
module.exports = mongoose.model('student');
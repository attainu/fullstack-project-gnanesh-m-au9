var mongoose = require('mongoose');

var facultySchema = mongoose.Schema({
    name:String,
    dob:Date,
    gender:String,
    doj:Date,
    branch:String,
    regNo:String,
    password:String,
    collegeCode:String,
})

mongoose.model('faculty',facultySchema);

module.exports = mongoose.model('faculty');
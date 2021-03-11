var mongoose = require('mongoose');

//what kind of fields will be there in collections
var adminSchema  = new mongoose.Schema({
    regNo:String,
    dob:Date,
    name:String,
    branch:String,
    password:String,
    collegeCode:String
})
//mongoose.model('collection','schema)
mongoose.model('admin',adminSchema);
module.exports = mongoose.model('admin');
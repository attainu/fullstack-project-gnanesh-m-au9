var mongoose = require('mongoose');

//what kind of fields will be there in collections
var adminSchema  = new mongoose.Schema({
    regNo:String,
    name:String,
    password:String
})
//mongoose.model('collection','schema)
mongoose.model('admin',adminSchema);
module.exports = mongoose.model('admin');
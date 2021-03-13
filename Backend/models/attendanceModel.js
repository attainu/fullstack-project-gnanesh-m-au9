var mongoose = require('mongoose');

var attendanceSchema = mongoose.Schema({
    branch:String,
    sem:String,
    date:String,
    period:Number,
    attended:Array
})

mongoose.model('attendance',attendanceSchema);
module.exports = mongoose.model('attendance');
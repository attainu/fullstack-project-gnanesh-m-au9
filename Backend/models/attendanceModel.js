var mongoose = require('mongoose');

var attendanceSchema = mongoose.Schema({
    branch:String,
    sem:String,
    date:Date,
    period:Number,
    attended:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'student'
        }
    ]
})

mongoose.model('attendance',attendanceSchema);
module.exports = mongoose.model('attendance');
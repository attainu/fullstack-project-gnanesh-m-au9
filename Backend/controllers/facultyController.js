const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./config');
const Faculty = require('../models/facultyModel');
const Attendance = require('../models/attendanceModel');

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

//faculty login
router.post('/login',(req,res)=>{
    Faculty.findOne({regNo:req.body.regNo},(err,data)=>{
        if(err) return res.send({auth:false,"error":"cannot login"});
        if(!data){
            return res.send({auth:false,"error":'Invalid REGISTRATION NUMBER'});
        }else{
            var isValidPassword = bcrypt.compareSync(req.body.password,data.password)
            if(!isValidPassword) return res.status(500).send({auth:false,"error":"Invalid Password"})
            // generating tokens using userid,secret,expiretime
            // var token = jwt.sign({id:data._id},config.secret,{expiresIn:86400});
            // return res.send({auth:true,token:token,data:data})
            return res.send(data)
        }
    })
})

//faculty update password
router.put('/updatepassword',(req,res)=>{
    let regNo=req.body.regNo;
    let oldpassword = req.body.oldpassword;
    let newpassword=bcrypt.hashSync(req.body.newpassword);
    Faculty.findOne({regNo:regNo},(err,data)=>{
        if(err) return res.send({'error':'cant find faculty'})
        if(!data) return res.send({'error':'Invalid registration number'})
        var isOldPasswordValid = bcrypt.compareSync(oldpassword,data.password)
        if(!isOldPasswordValid) return res.send({'error':'Invalid password,please enter correct password'})
        Faculty.updateOne(
            {'regNo':regNo},
            {
                $set:{
                    password:newpassword
                }
            },(err,data)=>{
                if(err) return res.send({'error':'cant find faculty'})
                return res.send({'update':"success",'message':'Password updated succesfully'})
            })
    })    
})


// Faculty update profile
// important:dont use postman to update profile, it may make other fields null, if we dont pass values 
// from postman
router.put('/updateprofile',(req,res)=>{
    let regNo=req.body.regNo;
    Faculty.updateMany(
        {regNo:regNo},
        {
            $set:{
                name:req.body.name,
                dob:req.body.dob,
                gender:req.body.gender
            }
        },
        (err,data)=>{
            if(err) return res.send({'error':'cant update faculty'})
            return res.send({update:'success','message':'faculty profile updated'});
        })
    })

// mark attendance
router.post('/markattendance',(req,res)=>{
    let attendedStudents={
        branch:req.body.branch,
        sem:req.body.sem,
        date:req.body.date,
        period:req.body.period,
        attended:req.body.attended
    }
    Attendance.create(attendedStudents,(err,data)=>{
        if(err) return res.status(500).send({'error':'cant mark attendance'})
        return res.status({'message':'attendance marked succesfully'})
    })
})
module.exports = router;
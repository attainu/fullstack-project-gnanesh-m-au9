const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./config');
const Admin = require('../models/adminModel');
const Student = require('../models/studentModel');
const Faculty = require('../models/facultyModel');

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

// registration
// router.post('/register',(req,res)=>{
//     var enteredPassword = bcrypt.hashSync(req.body.password);
//     Admin.create({
//         regNo:req.body.regNo,
//         password:enteredPassword,
//         name:req.body.name
//     },(err,user)=>{
//         if(err) throw err;
//         return res.status(200).send('Register success');
//     })
// })

// login
router.post('/login',(req,res)=>{
    Admin.findOne({regNo:req.body.regNo},(err,data)=>{
        if(err) throw err;
        if(!data){
            return res.send('Invalid REGISTRATION NUMBER');
        }else{
            var isValidPassword = bcrypt.compareSync(req.body.password,data.password)
            if(isValidPassword){
                return res.send(data)
            }else{
                return res.send('Wrong Password');
            }
        }
    })
})

// add students
router.post('/addstudent',(req,res)=>{
    Student.create({
        name:req.body.name,
        dob:req.body.dob,
        admissionYear:req.body.admissionYear,
        branch:req.body.branch,
        regNo:req.body.regNo,
        sem:req.body.sem,
        password:req.body.dob,
        gender:req.body.gender
    },(err,data)=>{
        if(err) throw err;
        return res.send({registration:'success',message:'New Student added'})
    })
})

// get students
router.get('/studentslist',(req,res)=>{
    let student={
        branch : req.body.branch,
        sem : req.body.sem
    }
    Student.find(student,(err,data)=>{
        if(err) throw err;
        return res.send(data)
    })
})

// add faculty
router.post('/addfaculty',(req,res)=>{
    Faculty.create({
        name:req.body.name,
        dob:req.body.dob,
        gender:req.body.gender,
        doj:req.body.doj,
        branch:req.body.branch,
        regNo:req.body.regNo,
        password:req.body.dob
    },(err,data)=>{
        if(err) throw err;
        return res.send({registration:'success',message:'New Faculty added'})
    })
})

// get faculty
router.get('/facultylist',(req,res)=>{
    let branch=req.body.branch
    Faculty.find({branch},(err,data)=>{
        if(err) throw err;
        return res.send(data)
    })
})

module.exports = router;
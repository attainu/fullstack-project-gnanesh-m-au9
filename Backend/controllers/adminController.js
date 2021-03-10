const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./config');
const Admin = require('../models/adminModel');
const Student = require('../models/studentModel');
const Faculty = require('../models/facultyModel');
const Subject = require('../models/subjectModel');

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
        if(err) return res.send({auth:false,"error":"cannot login"});
        if(!data){
            return res.send({auth:false,"error":'Invalid REGISTRATION NUMBER'});
        }else{
            var isValidPassword = bcrypt.compareSync(req.body.password,data.password)
            if(!isValidPassword) return res.status(500).send({auth:false,"error":"Invalid Password"})
            // generating tokens using userid,secret,expiretime
            var token = jwt.sign({id:data._id},config.secret,{expiresIn:86400});
            return res.send({auth:true,token:token})
        }
    })
})

// add students
router.post('/addstudent',(req,res)=>{
    // var token = req.headers['x-access-token'];
    // if(!token) return res.send({auth:false,token:'No token Provided'})
    // jwt.verify(token,config.secret,(err,data)=>{
    //     if(err) return res.status(500).send({auth:false,'error':'Invalid token'})
        Student.create({
            name:req.body.name,
            dob:req.body.dob,
            admissionYear:req.body.admissionYear,
            branch:req.body.branch,
            regNo:req.body.regNo,
            sem:req.body.sem,
            password:bcrypt.hashSync(req.body.dob),
            gender:req.body.gender,
            collegeCode:req.body.collegeCode
        },(err,data)=>{
            if(err) return res.send({registration:'failure','error':'cannot add Student'})
            return res.send({registration:'success',message:'New Student added'})
        })
    // }) 
})

// get students
router.get('/studentslist',(req,res)=>{
    // var token = req.headers['x-access-token'];
    // if(!token) return res.send({auth:false,token:'No token Provided'})
    // jwt.verify(token,config.secret,(err,data)=>{
    //     if(err) return res.status(500).send({auth:false,'error':'Invalid token'})
        let student={
            branch : req.body.branch,
            sem : req.body.sem
        }
        Student.find(student,(err,data)=>{
            if(err) return res.send({'error':'cannot get students'})
            return res.send({data:data})
        })
    // })  
})

// add faculty
router.post('/addfaculty',(req,res)=>{
    // var token = req.headers['x-access-token'];
    // if(!token) return res.send({auth:false,token:'No token Provided'})
    // jwt.verify(token,config.secret,(err,data)=>{
    //     if(err) return res.status(500).send({auth:false,'error':'Invalid token'})
        Faculty.create({
            name:req.body.name,
            dob:req.body.dob,
            gender:req.body.gender,
            doj:req.body.doj,
            branch:req.body.branch,
            regNo:req.body.regNo,
            password:bcrypt.hashSync(req.body.dob),
            collegeCode:req.body.collegeCode
        },(err,data)=>{
            if(err) return res.send({registration:'failure','error':'cannot add faculty'})
            return res.send({registration:'success',message:'New Faculty added'})
        })
    // })
})

// get faculty
router.get('/facultylist',(req,res)=>{
    // var token = req.headers['x-access-token'];
    // if(!token) return res.send({auth:false,token:'No token Provided'})
    // jwt.verify(token,config.secret,(err,data)=>{
    //     if(err) return res.status(500).send({auth:false,'error':'Invalid token'})
        let branch=req.body.branch
        Faculty.find({branch},(err,data)=>{
            if(err) return res.send({'error':'cannot get faculty'})
            return res.send({data:data})
        })
    // })
})

// add Subject
router.post('/addsubject',(req,res)=>{
    var token = req.headers['x-access-token'];
    if(!token) return res.send({auth:false,token:'No token Provided'})
    jwt.verify(token,config.secret,(err,data)=>{
        if(err) return res.status(500).send({auth:false,'error':'Invalid token'})
        Subject.create({
            branch:req.body.branch,
            sem:req.body.sem,
            subName:req.body.subName,
            subCode:req.body.subCode,
            collegeCode:req.body.collegeCode
        },(err,data)=>{
            if(err) return res.send({registration:'failure','error':'cannot add Subject'})
            return res.send({registration:'success',message:'New Subject added'})
        })
    })
})

// get subject
router.get('/subjectlist',(req,res)=>{
    var token = req.headers['x-access-token'];
    if(!token) return res.send({auth:false,token:'No token Provided'})
    jwt.verify(token,config.secret,(err,data)=>{
        if(err) return res.status(500).send({auth:false,'error':'Invalid token'})
        let subject={
            branch:req.body.branch,
            sem:req.body.sem
        }
        Subject.find(subject,(err,data)=>{
            if(err) return res.send({'error':'cannot get subjects'})
            return res.send({data:data})
        })
    })
})

module.exports = router;
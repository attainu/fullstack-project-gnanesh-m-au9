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
    Admin.findOne({regNo:req.body.data.regNo},(err,data)=>{
        if(err) return res.send({auth:false,"error":"cannot login"});
        if(!data){
            return res.send({auth:false,"error":'Invalid REGISTRATION NUMBER'});
        }else{
            var isValidPassword = bcrypt.compareSync(req.body.data.password,data.password)
            if(!isValidPassword) return res.status(500).send({auth:false,"error":"Invalid Password"})
            // generating tokens using userid,secret,expiretime
            var token = jwt.sign({id:data._id},config.secret,{expiresIn:86400});
            return res.send({auth:true,token:token,admindata:data})
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
            name:req.body.data.name,
            dob:req.body.data.dob,
            admissionYear:req.body.data.admissionYear,
            branch:req.body.data.branch,
            regNo:req.body.data.regNo,
            sem:req.body.data.sem,
            password:bcrypt.hashSync(req.body.data.dob),
            gender:req.body.data.gender,
            collegeCode:req.body.data.collegeCode
        },(err,data)=>{
            if(err) return res.send({registration:'failure','error':'cannot add Student'})
            return res.send({registration:'success',message:'New Student added'})
        })
    // }) 
})

// get students
router.post('/studentslist',(req,res)=>{
    // var token = req.headers['x-access-token'];
    // if(!token) return res.send({auth:false,token:'No token Provided'})
    // jwt.verify(token,config.secret,(err,data)=>{
    //     if(err) return res.status(500).send({auth:false,'error':'Invalid token'})
        // console.log(req.body)
        let student={
            branch : req.body.data.branch,
            sem : req.body.data.sem
        }
        Student.find(student,(err,data)=>{
            if(err) return res.send({'error':'cannot get students'})
            return res.send(data)
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
            name:req.body.data.name,
            dob:req.body.data.dob,
            gender:req.body.data.gender,
            doj:req.body.data.doj,
            branch:req.body.data.branch,
            regNo:req.body.data.regNo,
            password:bcrypt.hashSync(req.body.data.dob),
            collegeCode:req.body.data.collegeCode
        },(err,data)=>{
            if(err) return res.send({registration:'failure','error':'cannot add faculty'})
            return res.send({registration:'success',message:'New Faculty added'})
        })
    // })
})

// get faculty
router.post('/facultylist',(req,res)=>{
    // var token = req.headers['x-access-token'];
    // if(!token) return res.send({auth:false,token:'No token Provided'})
    // jwt.verify(token,config.secret,(err,data)=>{
    //     if(err) return res.status(500).send({auth:false,'error':'Invalid token'})
        let branch=req.body.data.branch
        Faculty.find({branch},(err,data)=>{
            if(err) return res.send({'error':'cannot get faculty'})
            return res.send(data)
        })
    // })
})

// add Subject
router.post('/addsubject',(req,res)=>{
    // var token = req.headers['x-access-token'];
    // if(!token) return res.send({auth:false,token:'No token Provided'})
    // jwt.verify(token,config.secret,(err,data)=>{
    //     if(err) return res.status(500).send({auth:false,'error':'Invalid token'})
        Subject.create({
            branch:req.body.data.branch,
            sem:req.body.data.sem,
            subName:req.body.data.subName,
            subCode:req.body.data.subCode,
            collegeCode:req.body.data.collegeCode
        },(err,data)=>{
            if(err) return res.send({registration:'failure','error':'cannot add Subject'})
            return res.send({registration:'success',message:'New Subject added'})
        })
    // })
})

// get subject
router.post('/subjectlist',(req,res)=>{
    // var token = req.headers['x-access-token'];
    // if(!token) return res.send({auth:false,token:'No token Provided'})
    // jwt.verify(token,config.secret,(err,data)=>{
    //     if(err) return res.status(500).send({auth:false,'error':'Invalid token'})
    // console.log(req.body.data)
        let subject={
            branch:req.body.data.branch,
            sem:req.body.data.sem
        }
        Subject.find(subject,(err,data)=>{
            if(err) return res.send({'error':'cannot get subjects'})
            return res.send(data)
        })
    // })
})

// add admin
router.post('/addadmin',(req,res)=>{
    // var token = req.headers['x-access-token'];
    // if(!token) return res.send({auth:false,token:'No token Provided'})
    // jwt.verify(token,config.secret,(err,data)=>{
    //     if(err) return res.status(500).send({auth:false,'error':'Invalid token'})
            Admin.create({
                name:req.body.data.name,
                regNo:req.body.data.regNo,
                dob:req.body.data.dob,
                password:bcrypt.hashSync(req.body.data.dob),
                branch:req.body.data.branch,
                collegeCode:req.body.data.collegeCode
            },(err,user)=>{
                if(err) throw err;
                return res.status(200).send({'register':'success','message':'Admin Register successfully'});
            })
    // }) 
})

// get Admins list
router.get('/adminslist',(req,res)=>{
    // var token = req.headers['x-access-token'];
    // if(!token) return res.send({auth:false,token:'No token Provided'})
    // jwt.verify(token,config.secret,(err,data)=>{
    //     if(err) return res.status(500).send({auth:false,'error':'Invalid token'})
        // console.log(req.body)
        Admin.find({},(err,data)=>{
            if(err) return res.send({'error':'cannot get admins'})
            return res.send(data)
        })
    // })  
})

module.exports = router;
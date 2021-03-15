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
const path = require('path');
const fs = require('fs');

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
        if(err) return res.status(500).send({"message":"cannot login"});
        if(!data){
            return res.status(400).send({"message":'Invalid REGISTRATION NUMBER'});
        }else{
            var isValidPassword = bcrypt.compareSync(req.body.data.password,data.password)
            if(!isValidPassword) return res.status(400).send("Invalid Password")
            // generating tokens using userid,secret,expiretime
            var token = jwt.sign({id:data._id},config.secret,{expiresIn:86400});
            return res.send({token:token,admindata:data})
        }
    })
})

// admin update password


// Admin update profile
// important:dont use postman to update profile, it may make other fields null, if we dont pass values 
// from postman
router.put('/updateadmin',(req,res)=>{
    let regNo=req.body.regNo;
    Admin.updateMany(
        {regNo:regNo},
        {
            $set:{
                name:req.body.name,
                dob:req.body.dob,
                branch:req.body.branch,
                collegeCode:req.body.collegeCode,
                // avatar:req.file.path
            }
        },
        (err,data)=>{
            if(err) return res.status(400).send({'message':'cant update Admin'})
            return res.send({'message':'Admin profile updated'});
        })
    })


// add students
router.post('/addstudent',(req,res)=>{
    var token = req.headers['x-access-token'];
    if(!token) return res.send({message:'No token Provided'})
    jwt.verify(token,config.secret,(err,data)=>{
        if(err) return res.status(500).send({'message':'Invalid token'})
        
        Student.findOne({regNo:req.body.data.regNo},(err,data)=>{
            if(err) return res.status(400).send({'message':'cannot add student'})
            if(data) return res.status(400).send({'message':'student with given ID is already present'})
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
                if(err) return res.status(500).send({'error':'cannot add Student'})
                return res.send({message:'New Student added'})
            })
        })
    }) 
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
        Student.find(student,{password:0},(err,data)=>{
            if(err) return res.status(500).send({'message':'cannot get students'})
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
    Faculty.findOne({regNo:req.body.data.regNo},(err,data)=>{
        if(err) return res.status(400).send({'message':'cannot add Faculty'})
        if(data) return res.status(400).send({'message':'Faculty with given ID is already present'})
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
            if(err) return res.status(500).send({'message':'cannot add faculty'})
            return res.send({'message':'New Faculty added'})
        })
    // })
    })
})

// get faculty
router.post('/facultylist',(req,res)=>{
    // var token = req.headers['x-access-token'];
    // if(!token) return res.send({auth:false,token:'No token Provided'})
    // jwt.verify(token,config.secret,(err,data)=>{
    //     if(err) return res.status(500).send({auth:false,'error':'Invalid token'})
        let branch=req.body.data.branch
        Faculty.find({branch},{password:0},(err,data)=>{
            if(err) return res.status(500).send({'message':'cannot get faculty'})
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
    Subject.findOne({subCode:req.body.data.subCode},(err,data)=>{
        if(err) return res.status(400).send({'message':'cannot add Subject'})
        if(data) return res.status(400).send({'message':'Subject with given Code is already present'})
        Subject.create({
            branch:req.body.data.branch,
            sem:req.body.data.sem,
            subName:req.body.data.subName,
            subCode:req.body.data.subCode,
            collegeCode:req.body.data.collegeCode
        },(err,data)=>{
            if(err) return res.status(500).send({'message':'cannot add Subject'})
            return res.send({message:'New Subject added'})
        })
    // })
    })
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
            if(err) return res.status(500).send({'message':'cannot get subjects'})
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
    Admin.findOne({regNo:req.body.data.regNo},(err,data)=>{
        if(err) return res.status(400).send({'message':'cannot add Admin'})
        if(data) return res.status(400).send({'message':'Admin with given Code is already present'})
            Admin.create({
                name:req.body.data.name,
                regNo:req.body.data.regNo,
                dob:req.body.data.dob,
                password:bcrypt.hashSync(req.body.data.dob),
                branch:req.body.data.branch,
                collegeCode:req.body.data.collegeCode
            },(err,user)=>{
                if(err) return res.status(500).send({message:'cannot add admin'});
                return res.status(200).send({'register':'success','message':'Admin Register successfully'});
            })
    // }) 
    })
})

// get Admins list
router.get('/adminslist',(req,res)=>{
    // var token = req.headers['x-access-token'];
    // if(!token) return res.send({auth:false,token:'No token Provided'})
    // jwt.verify(token,config.secret,(err,data)=>{
    //     if(err) return res.status(500).send({auth:false,'error':'Invalid token'})
        // console.log(req.body)
        Admin.find({},{password:0},(err,data)=>{
            if(err) return res.status(500).send({'message':'cannot get admins'})
            return res.send(data)
        })
    // })  
})

// get admin by his registration number
router.get('/adminbyid/:id',(req,res)=>{
    Admin.findOne({regNo:req.params.id},(err,data)=>{
        if(err) return res.status(500).send({'message':'cannnot find admin'})
        return res.send(data)
    })
})

//  Update profile picture
router.post('/updateadminpic',(req,res)=>{
    Admin.uploadedAvatar(req,res,function(err){
        if(err) throw err;
        let regNo = req.body.regNo;
        Admin.findOne({regNo:regNo},(err,data)=>{
            
            if(req.file){
                if(data.avatar){
                    fs.unlinkSync(path.join(__dirname,"..",data.avatar))
                }
                data.avatar=Admin.avatarPath +'/'+ req.file.filename;
                data.save()
                    .then(doc=>{
                        res.status(201).json({
                            message:'Profile image updated succesfully',
                            results:doc
                        });
                    })
                    .catch(err=>{
                        res.json(err)
                    })
                }
           })
    })
})

module.exports = router;
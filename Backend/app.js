const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var db = require('./db');
const cors = require('cors');
app.use(cors());

app.get('/',(req,res)=>{
    return res.send('health check ok')
})

const AdminController = require('./controllers/adminController');
app.use('/admin',AdminController);

const StudentController = require('./controllers/studentController');
app.use('/student',StudentController);

const facultyController = require('./controllers/facultyController');
app.use('/faculty',facultyController);

app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server is running at port:${port}`)
})

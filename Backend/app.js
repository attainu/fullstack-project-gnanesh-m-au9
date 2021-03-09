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

app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server is running at port:${port}`)
})

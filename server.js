//import { PassThrough } from 'stream';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');

const db = require('./config/db');

mongoose.connect(db.database);

mongoose.connection.on('connected', () => {
  console.log('Connected to Database '+db.database);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

const app = express();
const users = require('./routes/users');

// var log4js = require('log4js');
// log4js.configure('config/log4js.json');
// var log = log4js.getLogger("server");

app.use(cors({origin:'http://localhost:4200'}));

// require('dotenv').config();

app.use(express.static(path.join(__dirname, 'docspace')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/', users);


// app.get('/', (req, res,next) => {
//     res.send('index');
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'docspace/src/index.html'));
});
// app.post('/',(req,res) => {
//   // const email = req.body.email;
//   const password = req.body.password;[]
//
//   db.query('SELECT email,password FROM user WHERE email= ? ', [req.body.email] ,function(err,result,fields){
//     if(err){
//     res.json({success:false, msg:'ERROR'});
//     }
//     // if (result == NULL) {
//     // console.log("no valid User");
//     // }
//     res.json({success:true, msg:'USER'});
//     console.log(result);
//     res.render('users',{title:'Logged'});
//   });
//   // console.log(email,password);
// });

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


//module.exports = app;

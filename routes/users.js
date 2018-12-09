const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const bodyParser = require('body-parser');

const User = require('../models/usermodels');

router.post('/addemployee',(req,res,next) =>{
  let newUser = new User({
    fullname : req.body.fullname,
    date_of_birth: req.body.dob,
    gender: req.body.gender,
    phone_no: req.body.phone_no,
    nic_no: req.body.nic_no,
    status: req.body.status,
    role: req.body.role,
    level: req.body.level,
    emp_id: req.body.emp_id,
    inserted_date_time: req.body.inserted_date_time,
    updated_date_time: req.body.updated_date_time,
    inserted_user_id: req.body.inserted_user_id,
    updated_user_id: req.body.updated_user_id,    
    email: req.body.email,
    password: req.body.password,
  });
  
  User.addUser(newUser,(err,user) =>{
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else{
      res.json({success: true, msg:'User registerd'});
    }
  })

  // db.query('INSERT INTO user_roll (id,roll_type,level,inserted_date_time,updated_date_time) VALUES (?, ?, ?, ?, ?)', [empId,role,level,today,today], function(err, result,fields){
  //   if(err) throw err;
  //   res.json({success:true, msg:'Successfully added new Employee'});
  //   // res.render('index');
  //   // console.log(result);
  //   // res.json(data);
  // });
  // db.query('INSERT INTO city (id,city,level,inserted_date_time,updated_date_time) VALUES (?, ?, ?, ?, ?)', [empId,role,level,today,today], function(err, result,fields){
  //   if(err) throw err;
  //   res.json({success:true, msg:'Successfully added new Employee'});
  //   // res.render('index');
  //   // console.log(result);
  //   // res.json(data);
  // });
  // console.log(today);
});

router.post('/login',(req,res,next) =>{
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, db.secret, {
          expiresIn: 86400*30 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            fullname: user.fullname,
            emp_id: user.emp_id,
            email: user.email,
            role: user.role
          }
        })
        console.log(token);
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });


  // var appData = {
  //   "error": 1,
  //   "data": ""
  //   };

  // db.query('SELECT email,password FROM user WHERE email = ? ', [email] ,function(err,result,fields){
  //   if (err) {
  //     appData.error = 1;
  //     appData["data"] = "Error Occured!";
  //     res.status(400).json(appData);
  //   } else {
  //     if(result.length > 0){
  //       if(result[0].password == password){ 
  //         // const token = jwt.sign(result, db.secret, {
  //         //   expiresIn: 6600
  //         // });
  //         res.json({
  //           success:true, 
  //           msg:'Email Exsist',
  //           //token: 'JWT '+token
  //         });
  //         // res.render('index');
  //         //console.log(token);
  //       }
  //       else{
  //         res.json({success:false, msg:'Wrong Passwod'}); 
  //       }
        
  //     }else{
  //       res.json({success:false, msg:'You are not registerd'});  
  //     } 
  //   }
  // });
});

// router.post('/login',(req,res) => {
//   // const email = req.body.email;
//   const password = req.body.password;
//
//   db.query('SELECT email,password FROM user WHERE email= ? ', [req.body.email] ,function(err,result,fields){
//     if(err){
//     res.json({success:false, msg:'ERROR'});
//     }
//     res.json({success:true, msg:'USER'});
//     console.log(result);
//   });
//   // console.log(email,password);
// });

router.get('/profile', passport.authenticate('jwt',{session:false}), (req, res, next) => {
  //console.log(req.user);
  res.json({user: req.user});
  //res.send(req.user);
});

module.exports = router;

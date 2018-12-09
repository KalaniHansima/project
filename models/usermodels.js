const mongoose = require('mongoose');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema ({
    fullname: String,
    date_of_birth: {
      type: Date
    },
    gender:{
      type:String,
      enum: ["male", "female"]
    },
    phone_no: String,
    nic_no: String,
    status :{
      type: String,
      enum: ["active","inactive"]
    },
    role: String,
    level: String,
    emp_id: {
      type: String,
      //required: true
    },
    inserted_date_time:{
      type:Date
    },
    updated_date_time:{
      type:Date
    },
    inserted_user_id:{
      type:String
    },
    updated_user_id:{
      type:String
    },
    email: {
      type: String,
      //required: true
    },
    password: {
      type: String,
     // required: true
    },
    address: {
      address_no: String,
      street_1: String,
      street_2:String,
      city: String,
      province: String,
      postalcode: String
    }
  });

  const User = module.exports = mongoose.model('User', UserSchema);

  module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
  }
  
  module.exports.getUserByEmail = function(email, callback) {
    const query = {email: email}
    User.findOne(query, callback);
  }

  module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(newUser.password,salt, (err, hash)=>{
        if(err) throw err;
        newUser.password = hash;
        newUser.save(callback);
      });
    });
  }
  module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
  }
  
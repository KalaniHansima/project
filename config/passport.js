const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/usermodels');
const config = require('../config/db');


module.exports = function(passport) {
  const opts = {};
  //console.log('Connected to Databasedjhsdja ');
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
  //opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  //opts.passReqToCallback = true;
  //console.log('jwtPayload1');
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.getUserById(jwt_payload.data._id, (err, user) => {
      if(err) {
        return done(err, false);
      }

      if(user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}
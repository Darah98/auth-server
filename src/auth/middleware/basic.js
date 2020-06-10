'use strict';
const base64 = require('base-64');
const userSchema = require('../models/users-schema.js');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Username Or Password');
  } else {
    const basic = req.headers.authorization.split(' ').pop();
    const [user, pass] = base64.decode(basic).split(':');
    userSchema
      .authenticateBasic(user, pass)
      .then((validUser) => {
        req.token = userSchema.generateToken(validUser);
        console.log('signed in');
        next();
      })
      .catch((err) => next(err.message));
  }
};

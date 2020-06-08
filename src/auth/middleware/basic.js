'use strict';
const base64 = require('base-64');
const userModel = require('../models/users-model.js');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Username Or Password');
  } else {
    const basic = req.headers.authorization.split(' ').pop();
    const [user, pass] = base64.decode(basic).split(':');
    userModel
      .authenticateBasic(user, pass)
      .then((validUser) => {
        req.token = userModel.generateToken(validUser);
        next();
      })
      .catch((err) => next(err.message));
  }
};

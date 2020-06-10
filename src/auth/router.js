'use strict';
const express = require('express');
const userModel = require('./models/users-model.js');
const userSchema = require('./models/users-schema.js');
const basicAuth = require('./middleware/basic.js');
const router = express.Router();

router.post('/signup', signupOne);
router.post('/signin', basicAuth, signinOne);
router.get('/users', listAll);

function signupOne(req, res, next) {
  const newMod = new userModel(userSchema);
  newMod.save(req.body).then((user) => {
    const token = userSchema.generateToken(user);
    res.json({ token });
    next();
  });
}

function signinOne(req, res, next) {
  res.json({ token: req.token });
  next();
}

function listAll(req, res, next) {
  userSchema
    .list()
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => next(err.message));
}
module.exports = router;

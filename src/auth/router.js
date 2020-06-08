'use strict';
const express = require('express');
const userModel = require('./models/users-model.js');
const basicAuth = require('./middleware/basic.js');
const router = express.Router();
const parser = express.json();

router.post('/signup', signupOne);
router.post('/signin', basicAuth, signinOne);
router.get('/users', listAll);

function signupOne(req, res, next) {
  userModel.save(req.body).then((user) => {
    const token = userModel.generateToken(user);
    res.json({ token }).catch((err) => {
      next(err.message);
    });
  });
}

function signinOne(req, res, next) {
  res.json({ token: req.token }).catch((err) => next(err.message));
}

function listAll(req, res, next) {
  res.json(userModel.list()).catch((err) => next(err.message));
}
module.exports = router;

'use strict';
const express = require('express');
const userModel = require('./models/users-model.js');
const userSchema = require('./models/users-schema.js');
const basicAuth = require('./middleware/basic.js');
const oAuth= require('./middleware/oauth.js');
const bearerAuth = require('./middleware/bearer.js');
const permission= require('../auth/middleware/authorize.js');
const router = express.Router();

router.post('/signup', signupOne);
router.post('/signin', basicAuth, signinOne);
router.get('/users', listAll);
router.get('/oauth', oAuth, authenticateOne)
router.post('/secret', bearerAuth, secretOne)
router.get('/read', bearerAuth, permission('read'), userRoute);
router.post('/create', bearerAuth, permission('create'), writerRoute);
router.put('/update', bearerAuth, permission('update'), editorRoute);
router.delete('/delete', bearerAuth, permission('delete'), adminRoute);

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

function authenticateOne(req, res, next){
  res.status(200).send(req.token);
  next();
}

function secretOne(req, res, next){
  res.status(200).send('hla wallah');
}

function userRoute(req, res, next){
  res.status(200).send('Route */read* worked');
}

function writerRoute(req, res, next){
  res.status(200).send('Route */create* worked');
}

function editorRoute(req, res, next){
  res.status(200).send('Route */update* worked');
}

function adminRoute(req, res, next){
  res.status(200).send('Route */delete* worked');
}
module.exports = router;

'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const schema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

let schemaModel = mongoose.model('user', schema);
module.exports = schemaModel;
module.exports.authenticateBasic = async function (user, pass) {
  const userInfo = await schemaModel.find({ username: user }, () => {
    console.log('found');
  });
  const foundPass = userInfo[0].password;
  const valid = bcrypt.compare(pass, foundPass);
  return valid ? userInfo[0].username : Promise.reject();
}
module.exports.generateToken = function (user) {
  const token = jwt.sign({ username: user.username }, SECRET, {expiresIn: 900});
  return token;
}
module.exports.list = async function () {
  return await schemaModel.find({});
}
module.exports.tokenAuthentication= async function(token){
  try{
    const yesToken= await jwt.verify(token, SECRET);
    const yesStored= await schemaModel.find({username: yesToken.username});
    const result = yesStored[0] ? Promise.resolve(yesStored) : Promise.reject('User Not Found');
    return result
  } catch(err){
    return Promise.reject(err.message);
  }
}

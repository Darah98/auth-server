'use strict';
require('dotenv').config();
const superagent = require('superagent');
const userSchema = require('../models/users-schema.js');
const userModel = require('../models/users-model.js');
const tokenServerUrl = 'https://github.com/login/oauth/access_token';
const remoteAPI = 'https://api.github.com/user';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_SERVER = process.env.API_SERVER;

module.exports = async (req, res, next) => {
    try {
        const code = req.query.code;
        const remoteToken = await codeForToken(code);
        const remoteUser = await getRemoteUser(remoteToken);
        const [user, token] = await getUserInfo(remoteUser);
        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        next(err.message)
    };
};

async function codeForToken(code) {
    const tokenRes = await superagent.post(tokenServerUrl).send({
        code: code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: API_SERVER,
        grant_type: 'authorization_code',
    });
    const accessToken = tokenRes.body.access_token;
    console.log('hey from oauth', tokenRes.body);
    return accessToken;
}
async function getRemoteUser(token) {
    const userRes = await superagent.get(remoteAPI).set('Auhorization', `token ${token}`).set('user-agent', 'express-app');
    console.log('hey from oauth remote user');
    const user = userRes.body;
    return user;
}
async function getUserInfo(remoteUser) {
    const userRecord = {
        username: remoteUser.login,
        password: '18d12s',
    };
    const newMod= new userModel(userSchema);
    const storedUser= await newMod.find({username:userRecord.username});
    const user = storedUser ? storedUser[0] : newMod.save(userRecord);
    const token = userSchema.generateToken(user);
    return [user, token];
}
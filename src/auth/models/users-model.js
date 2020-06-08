'use strict';
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'shhitsasecret';
const userSchema = require('./users-schema.js');

class User {
  constructor(schema) {
    this.schema = schema;
  }
  async save(record) {
    if (!this.schema.record) {
      const newRecord = new this.schema(record);
      newRecord.password = await bcrypt.hash(record.password, 5);
      newRecord.username = record.username;
      return newRecord.save();
    }
    return Promise.reject();
  }
  async authenticateBasic(user, pass) {
    const valid = await bcrypt.compare(pass, this.schema[user].password);
    return valid ? this.schema[user] : Promise.reject();
  }
  generateToken(user) {
    const token = jwt.sign({ usename: user.username }, SECRET);
    return token;
  }
  list() {
    return this.schema.find({});
  }
}

module.exports = new User(userSchema);

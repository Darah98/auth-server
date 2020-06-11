'use strict';
require('dotenv').config();
const bcrypt = require('bcryptjs');

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
  // async read(user){

  // }
  list() {
    return this.schema.find({});
  }
}

module.exports = User;

'use strict';
const express = require('express');
const authRouter = require('./auth/router.js');
const app = express();
app.use(express.json());
app.use(express.static('./public'));
app.use('/auth', authRouter);

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || 3000;
    app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
  },
};

// PORT=3000
// SECRET=thisismysecret
// MONGODB_URI=mongodb://localhost:27017/userdb
// CLIENT_ID=450249c869ddd7f6455c
// CLIENT_SECRET=53f26c2054a40bf01d9ab8aa0fcc9b57d5d0ac2b
// API_SERVER=http://localhost:3000/auth/oauth
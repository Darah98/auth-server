'use strict';
const express = require('express');
const authRouter = require('./auth/router.js');
const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use(express.static('../public'));

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || 3000;
    app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
  },
};

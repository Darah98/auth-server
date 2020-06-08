'use strict';
const express = require('express');
const authRouter= require('./auth/router.js');
const app = express();

app.use(express.json());
app.use('/auth/v1', authRouter);

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || 3000;
    app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
  },
};

const express = require('express');

const app = express();

app.use(express.json({ limit: process.env.REQUEST_BODY_MAX_SIZE }));
app.use(express.static('public'));

module.exports = app;

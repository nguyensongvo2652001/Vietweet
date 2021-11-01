const express = require('express');

const errorController = require('./controllers/errorController');

const app = express();

app.use(express.json({ limit: process.env.REQUEST_BODY_MAX_SIZE }));
app.use(express.static('public'));

app.use(errorController);

module.exports = app;

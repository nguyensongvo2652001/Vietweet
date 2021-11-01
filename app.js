const express = require('express');
const morgan = require('morgan');

const errorController = require('./controllers/errorController');

const userRouter = require('./routers/userRouter');

const app = express();
const apiVersion = process.env.API_VERSION;
const apiBasePath = `/api/v${apiVersion}`;

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json({ limit: process.env.REQUEST_BODY_MAX_SIZE }));
app.use(express.static('public'));

app.use(`${apiBasePath}/users`, userRouter);

app.use(errorController);

module.exports = app;

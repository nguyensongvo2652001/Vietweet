const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const errorController = require('./controllers/errorController');

const userRouter = require('./routers/userRouter');
const followRouter = require('./routers/followRouter');

const app = express();
const apiVersion = process.env.API_VERSION;
const apiBasePath = `/api/v${apiVersion}`;

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(cookieParser());

app.use(express.json({ limit: process.env.REQUEST_BODY_MAX_SIZE }));
app.use(express.static('public'));

app.use(`${apiBasePath}/users`, userRouter);
app.use(`${apiBasePath}/follows`, followRouter);

app.use(errorController);

module.exports = app;

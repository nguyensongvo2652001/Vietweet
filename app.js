const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const errorController = require('./controllers/errorController');
const AppError = require('./utils/appError');

const userRouter = require('./routers/userRouter');
const followRouter = require('./routers/followRouter');
const tweetRouter = require('./routers/tweetRouter');
const likeRouter = require('./routers/likeRouter');
const replyRouter = require('./routers/replyRouter');
const searchRouter = require('./routers/searchRouter');
const viewRouter = require('./routers/viewRouter');

const app = express();
const apiVersion = process.env.API_VERSION;
const apiBasePath = `/api/v${apiVersion}`;

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.enable('trust proxy');

app.use(compression());
app.use(cookieParser());

const limiter = rateLimit({
  max: 5000,
  windowMs: 60 * 60 * 1000,
  message: 'Too much requests. Please try again later'
});

app.use(limiter);
app.use(mongoSanitize());
app.use(xss());

app.use(express.json({ limit: process.env.REQUEST_BODY_MAX_SIZE }));
app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', `${__dirname}/public/views`);

app.use(`${apiBasePath}/users`, userRouter);
app.use(`${apiBasePath}/follows`, followRouter);
app.use(`${apiBasePath}/tweets`, tweetRouter);
app.use(`${apiBasePath}/likes`, likeRouter);
app.use(`${apiBasePath}/replies`, replyRouter);
app.use(`${apiBasePath}/search`, searchRouter);
app.use('/', viewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorController);

module.exports = app;

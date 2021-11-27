const { promisify } = require('util');

const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const filterObject = require('../utils/filterObject');

const createToken = async user => {
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  return token;
};

const createAndSendToken = async args => {
  const { user, statusCode, req, res } = args;

  const token = await createToken(user);

  // Hide sensitive fields
  user.password = undefined;
  user.passwordChangedAt = undefined;
  user.role = undefined;

  res.cookie('jwt', token, {
    maxAge:
      Number(process.env.JWT_COOKIE_EXPIRES_IN) *
      Number(process.env.DAY_SECONDS) *
      1000,
    httpOnly: true,
    secure: req.secure || req.header('x-forwarded-proto') === 'https'
  });

  res.status(statusCode).json({
    status: 'success',
    data: {
      user,
      token
    }
  });
};

const signUp = catchAsync(async (req, res, next) => {
  const filteredBody =
    process.env.NODE_ENV === 'development'
      ? req.body
      : filterObject(req.body, 'email', 'username', 'password');

  const user = await User.create(filteredBody);

  await createAndSendToken({ user, statusCode: 201, req, res });
});

const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username)
    return next(new AppError('Username or email must be defined', 400));

  if (!password) return next(new AppError('Password must be defined', 400));

  const user = await User.findOne({
    $or: [{ username }, { email: username }]
  }).select('+password');
  if (!user || !(await user.checkPassword(password, user.password)))
    return next(new AppError('Incorrect username or password', 400));

  await createAndSendToken({ user, statusCode: 200, req, res });
});

const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1];

  token = token || req.cookies.jwt;
  if (!token) {
    return next(new AppError('Please log in to perform this action', 400));
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  const user = await User.findById(decoded.id).select('+passwordChangedAt');

  if (!user)
    return next(new AppError('No users found with the specified token', 400));

  const changedPasswordAfter = user.changedPasswordAfter(
    user.passwordChangedAt,
    decoded.iat
  );

  if (changedPasswordAfter)
    return next(
      new AppError(
        'Users with this token already changed their password. Please login again',
        400
      )
    );

  req.user = user;
  next();
});

module.exports = { signUp, login, protect };

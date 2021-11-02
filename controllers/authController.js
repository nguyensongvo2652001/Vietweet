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
    user,
    token
  });
};

const signUp = catchAsync(async (req, res, next) => {
  const filteredBody = filterObject(req.body, 'email', 'username', 'password');

  const user = await User.create(filteredBody);

  await createAndSendToken({ user, statusCode: 201, req, res });
});

const login = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username && !email)
    return next(new AppError('Username or email must be defined', 400));

  if (!password) return next(new AppError('Password must be defined', 400));

  const user = await User.findOne({ $or: [{ username }, { email }] }).select(
    '+password'
  );
  if (!user || !(await user.checkPassword(password, user.password)))
    return next(new AppError('Incorrect username or password', 400));

  await createAndSendToken({ user, statusCode: 200, req, res });
});

module.exports = { signUp, login };

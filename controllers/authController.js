const { promisify } = require('util');
const crypto = require('crypto');

const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const AppError = require('../utils/appError');
const Email = require('../utils/email');
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

const logout = (req, res, next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: req.secure || req.header('x-forwarded-proto') === 'https'
  });
  res.status(200).json({ status: 'success' });
};

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

const forgotPassword = catchAsync(async (req, res, next) => {
  //1. Get email or username from user
  const { username } = req.body;

  if (!username)
    return next(new AppError('Please provide your username or email.', 400));

  //2. Find account corresponding to that email/username
  const user = await User.findOne({ $or: [{ username }, { email: username }] });
  if (!user)
    return next(
      new AppError(
        'No accounts found with this username. Please try again',
        400
      )
    );

  //3.Create a passwordResetToken and passwordResetTokenExpiredAt field
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //4. Send email
  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/resetPassword/${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: `We have sent an email to ${user.email}. 
      Please check your email for instructions. Keep in mind that this email is only valid for 10 minutes`
    });
  } catch (e) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiresAt = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong sending the email. Please try again later.'
    });
  }
});

const resetPassword = catchAsync(async (req, res, next) => {
  //1. Check if the passwordResetToken is valid
  let { token } = req.params;
  token = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetTokenExpiresAt: { $gt: Date.now() }
  }).select('passwordResetTokenExpiresAt');

  if (!user)
    return next(
      new AppError('Password reset token is invalid or expired.', 400)
    );
  //2. Update password
  const { password } = req.body;
  if (!password)
    return next(new AppError('Please provide your new password', 400));

  user.password = password;
  await user.save();
  //3. Log the user in
  createAndSendToken({ user, statusCode: 200, req, res });
});

const changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword)
    return next(new AppError('Current password must be defined', 400));
  if (!newPassword)
    return next(new AppError('New password must be defined', 400));

  // 1) Get user from collection
  const user = await User.findById(req.user._id).select('+password');

  // 2) Check if PATCHed current password is correct
  if (!(await user.checkPassword(currentPassword, user.password))) {
    return next(new AppError('Your current password is wrong.', 400));
  }

  // 3) If so, update password
  user.password = newPassword;
  user.passwordChangedAt = Date.now() - 1000;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  await createAndSendToken({ user, statusCode: 200, req, res });
});

const deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+password');
  const { password } = req.body;

  if (!password) return next(new AppError('Please provide your password', 400));

  const isCorrectPassword = await user.checkPassword(password, user.password);

  if (!isCorrectPassword)
    return next(
      new AppError('Your password is incorrect. Please try again', 400)
    );

  await User.findByIdAndDelete(req.user._id);

  res.status(204).json({
    status: 'success',
    message: 'Account delete successfully'
  });
});

module.exports = {
  deleteMe,
  signUp,
  login,
  logout,
  protect,
  resetPassword,
  forgotPassword,
  changePassword
};

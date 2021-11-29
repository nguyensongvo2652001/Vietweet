const { promisify } = require('util');

const jwt = require('jsonwebtoken');

const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const Follow = require('../models/followModel');
const Tweet = require('../models/tweetModel');

const isLogin = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return next();

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  const user = await User.findById(decoded.id).select('+passwordChangedAt');

  if (!user) return next();

  const changedPasswordAfter = user.changedPasswordAfter(
    user.passwordChangedAt,
    decoded.iat
  );

  if (changedPasswordAfter) return next();

  req.user = user;
  res.locals.user = user;
  next();
});

const redirectIfNotLogin = (req, res, next) => {
  if (!req.user) return res.redirect('/');
  return next();
};

const redirectIfLogin = (req, res, next) => {
  if (req.user) return res.redirect('/homepage');
  return next();
};

const loginViewController = (req, res, next) => {
  res.status(200).render('login');
};

const homepageViewController = catchAsync(async (req, res, next) => {
  const followDocs = await Follow.find({ user: req.user.id });
  const followings = followDocs.map(followDoc => followDoc.following);

  const tweets = await Tweet.find({
    $or: [{ user: { $in: followings } }, { user: req.user.id }]
  })
    .sort('-dateTweeted')
    .populate('user');
  res.status(200).render('homepage', {
    tweets
  });
});

module.exports = {
  loginViewController,
  homepageViewController,
  isLogin,
  redirectIfLogin,
  redirectIfNotLogin
};

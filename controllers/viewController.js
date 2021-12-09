const { promisify } = require('util');
const crypto = require('crypto');

const jwt = require('jsonwebtoken');

const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const Follow = require('../models/followModel');
const Tweet = require('../models/tweetModel');
const Like = require('../models/likeModel');
const Reply = require('../models/replyModel');

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

const checkIfLikedTweet = async (req, tweet) => {
  const like = await Like.findOne({ tweet: tweet._id, user: req.user._id });
  if (!like) return false;
  return like._id;
};

const getAllTweets = async (req, query) => {
  let tweets = await Tweet.find(query)
    .sort('-dateTweeted')
    .populate('user');

  tweets = tweets.map(tweet => tweet.toObject());

  const liked = await Promise.all(
    tweets.map(async tweet => await checkIfLikedTweet(req, tweet))
  );

  tweets = tweets.map((tweet, index) => {
    return {
      ...tweet,
      liked: liked[index]
    };
  });

  return tweets;
};

const getAllLikedTweet = async query => {
  const likes = await Like.find(query).sort('-dateLiked');
  let tweets = await Promise.all(
    likes.map(async like => await Tweet.findById(like.tweet).populate('user'))
  );

  tweets = tweets.map(tweet => tweet.toObject());
  tweets = tweets.map((tweet, index) => {
    return {
      ...tweet,
      liked: likes[index]._id
    };
  });
  return tweets;
};

const homepageViewController = catchAsync(async (req, res, next) => {
  const followDocs = await Follow.find({ user: req.user.id });
  const followings = followDocs.map(followDoc => followDoc.following);

  const tweets = await getAllTweets(req, {
    $or: [{ user: { $in: followings } }, { user: req.user.id }]
  });

  res.status(200).render('homepage', {
    tweets
  });
});

const setCurrentUser = (req, res, next) => {
  req.params.username = req.user.username;
  next();
};

const profileViewController = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) {
    return next();
  }

  const tweets = await getAllTweets(req, { user: user._id });
  const likedTweets = await getAllLikedTweet({ user: user._id });

  const isLogInUser = req.user._id.equals(user._id);
  const followed = await Follow.findOne({
    user: req.user._id,
    following: user._id
  });

  res.status(200).render('profile', {
    user,
    tweets,
    likedTweets,
    isLogInUser,
    followed
  });
});

const forgotPasswordViewController = (req, res, next) => {
  res.status(200).render('forgotPassword');
};

const resetPasswordViewController = catchAsync(async (req, res, next) => {
  const token = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const valid = await User.findOne({
    passwordResetToken: token,
    passwordResetTokenExpiresAt: { $gt: Date.now() }
  });

  res.status(200).render('resetPassword', {
    valid,
    token: req.params.token
  });
});

const tweetDetailViewController = catchAsync(async (req, res, next) => {
  const tweet = await Tweet.findById(req.params.id).populate('user');
  if (!tweet) {
    console.log('No tweet found');
  }

  const replies = await Reply.find({ tweet: req.params.id })
    .populate('user')
    .sort('-dateReplied');

  res.status(200).render('tweetDetail', {
    tweet,
    replies,
    user: req.user
  });
});

module.exports = {
  loginViewController,
  homepageViewController,
  setCurrentUser,
  profileViewController,
  forgotPasswordViewController,
  resetPasswordViewController,
  isLogin,
  redirectIfLogin,
  redirectIfNotLogin,
  tweetDetailViewController
};

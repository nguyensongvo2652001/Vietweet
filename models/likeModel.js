const mongoose = require('mongoose');
const User = require('./userModel');
const Tweet = require('./tweetModel');
const AppError = require('../utils/appError');

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A like must belong to an user']
  },
  tweet: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tweet',
    required: [true, 'A like must belong to a tweet']
  }
});

// Make sure the user and tweet actually exist
likeSchema.pre('save', async function(next) {
  const user = await User.findById(this.user);
  const tweet = await Tweet.findById(this.tweet);

  if (!user)
    return next(new AppError(`Can not find user with id = ${this.user}`, 400));
  if (!tweet)
    return next(new AppError(`Can not find user with id = ${this.tweet}`, 400));
});

likeSchema.post('save', async function(doc, next) {
  const tweet = await Tweet.findById(doc.tweet);
  tweet.likeCounts += 1;

  await tweet.save({ validateBeforeSave: false });
  next();
});

likeSchema.post('findOneAndDelete', async function(doc, next) {
  const tweet = await Tweet.findById(doc.tweet);
  tweet.likeCounts -= 1;

  await tweet.save({ validateBeforeSave: false });
  next();
});

likeSchema.index({ user: 1, tweet: 1 }, { unique: true });

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;

const mongoose = require('mongoose');

const User = require('./userModel');
const Tweet = require('./tweetModel');
const AppError = require('../utils/appError');

const replySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A reply must belong to an user']
  },
  tweet: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tweet',
    required: [true, 'A reply must belong to a tweet']
  },
  content: {
    type: String,
    trim: true,
    required: [true, 'A reply must have content'],
    maxlength: [200, 'A reply can not be longer than 200 characters']
  },
  dateReplied: {
    type: Date,
    default: new Date()
  },
  image: {
    type: String
  }
});

// Make sure the user and tweet actually exist
replySchema.pre('save', async function(next) {
  const user = await User.findById(this.user);
  const tweet = await Tweet.findById(this.tweet);

  if (!user)
    return next(new AppError(`Can not find user with id = ${this.user}`, 400));
  if (!tweet)
    return next(
      new AppError(`Can not find tweet with id = ${this.tweet}`, 400)
    );
});

replySchema.post('save', async function(doc, next) {
  const tweet = await Tweet.findById(doc.tweet);
  tweet.replyCounts += 1;

  await tweet.save({ validateBeforeSave: false });
  next();
});

replySchema.post('findOneAndDelete', async function(doc, next) {
  const tweet = await Tweet.findById(doc.tweet);
  tweet.replyCounts -= 1;

  await tweet.save({ validateBeforeSave: false });
  next();
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;

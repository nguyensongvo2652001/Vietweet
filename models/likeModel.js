const mongoose = require('mongoose');
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
  try {
    const tweet = await Tweet.findById(this.tweet);

    if (!tweet)
      return next(
        new AppError(`Can not find tweet with id = ${this.tweet}`, 400)
      );
  } catch (e) {
    console.log(e);
  }
});

likeSchema.index({ user: 1, tweet: 1 }, { unique: true });

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;

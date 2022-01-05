const mongoose = require('mongoose');

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
    default: Date.now
  },
  image: {
    type: String
  }
});

// Make sure the user and tweet actually exist
replySchema.pre('save', async function(next) {
  const tweet = await Tweet.findById(this.tweet);

  if (!tweet)
    return next(
      new AppError(`Can not find tweet with id = ${this.tweet}`, 400)
    );
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;

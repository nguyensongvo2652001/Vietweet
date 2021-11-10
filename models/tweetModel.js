const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Tweet must belong to an user']
  },
  content: {
    type: String,
    trim: true,
    maxlength: [200, 'Tweet can not be longer than 200 characters'],
    required: [true, 'A tweet must have content']
  },
  image: String,
  dateTweeted: {
    type: Date,
    default: new Date()
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;

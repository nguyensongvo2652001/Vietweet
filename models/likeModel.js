const mongoose = require('mongoose');

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

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;

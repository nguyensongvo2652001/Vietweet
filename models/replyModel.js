const mongoose = require('mongoose');

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
  }
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;

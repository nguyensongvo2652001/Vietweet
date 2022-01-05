const mongoose = require('mongoose');
const tweetSchema = new mongoose.Schema(
  {
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
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tweetSchema.virtual('replies', {
  ref: 'Reply',
  foreignField: 'tweet',
  localField: '_id'
});

tweetSchema.virtual('likeCounts', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'tweet',
  count: true
});

tweetSchema.virtual('replyCounts', {
  ref: 'Reply',
  localField: '_id',
  foreignField: 'tweet',
  count: true
});

tweetSchema.pre(/^find/, function(next) {
  this.populate('likeCounts').populate('replyCounts');
  next();
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;

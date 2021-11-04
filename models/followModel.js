const mongoose = require('mongoose');

const AppError = require('../utils/appError');
const User = require('./userModel');

const followSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A follow must belong to an user']
  },
  following: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A follow must have a following user']
  }
});

// Make sure the user and following actually exist
followSchema.pre('save', async function(next) {
  const user = await User.findById(this.user);
  const following = await User.findById(this.following);

  if (!user)
    return next(new AppError(`Can not find user with id = ${this.user}`, 400));
  if (!following)
    return next(
      new AppError(`Can not find user with id = ${this.following}`, 400)
    );
});

// Make sure users can't follow themselves
followSchema.pre('save', function(next) {
  if (this.user.equals(this.following))
    return next(new AppError('You can not follow yourself', 400));

  next();
});

// An user can follow another user once
followSchema.index({ user: 1, following: 1 }, { unique: true });

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;

const Follow = require('../models/followModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const handlerFactory = require('./handlerFactory');

const setFollowRequestBody = (req, res, next) => {
  req.body.user = req.user.id;
  next();
};

const checkFollowUser = async (req, res, next) => {
  const follow =
    (await Follow.findById(req.params.id)) ||
    (await Follow.findOne({
      user: req.user.id,
      following: req.params.followingId
    }));

  if (!follow)
    return next(
      new AppError(`No follow was found with id = ${req.params.id}`, 404)
    );

  if (!follow.user.equals(req.user.id))
    return next(new AppError(`You are not allowed to delete this follow`, 401));

  req.params.id = follow.id;
  next();
};

const getFollowers = catchAsync(async (req, res, next) => {
  const followers = await Follow.find({ following: req.params.id })
    .select('id user')
    .populate({
      path: 'user',
      select: 'username email'
    });

  res.status(200).json({
    status: 'success',
    data: {
      length: followers.length,
      followers
    }
  });
});

const getFollowings = catchAsync(async (req, res, next) => {
  const followings = await Follow.find({ user: req.params.id })
    .select('id following')
    .populate({
      path: 'following',
      select: 'username email'
    });

  res.status(200).json({
    status: 'success',
    data: {
      length: followings.length,
      followings
    }
  });
});

const createFollow = handlerFactory.createOne(Follow, 'follow');

const deleteFollow = handlerFactory.deleteOne(Follow, 'follow');

module.exports = {
  createFollow,
  setFollowRequestBody,
  deleteFollow,
  checkFollowUser,
  getFollowers,
  getFollowings
};

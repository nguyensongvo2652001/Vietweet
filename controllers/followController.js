const Follow = require('../models/followModel');
const AppError = require('../utils/appError');

const handlerFactory = require('./handlerFactory');

const setFollowRequestBody = (req, res, next) => {
  req.body.user = req.user.id;
  req.body.following = req.params.followingId || req.body.following;
  next();
};

const checkFollowUser = async (req, res, next) => {
  const follow = await Follow.findById(req.params.id);

  if (!follow)
    return next(
      new AppError(`No follow was found with id = ${req.params.id}`, 404)
    );

  if (!follow.user.equals(req.user.id))
    return next(new AppError(`You are not allowed to delete this follow`, 401));

  next();
};

const createFollow = handlerFactory.createOne(Follow, 'follow');

const deleteFollow = handlerFactory.deleteOne(Follow, 'follow');

module.exports = {
  createFollow,
  setFollowRequestBody,
  deleteFollow,
  checkFollowUser
};

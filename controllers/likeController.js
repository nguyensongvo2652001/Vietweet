const Like = require('../models/likeModel');
const AppError = require('../utils/appError');

const handlerFactory = require('./handlerFactory');

const setLikeRequestBody = (req, res, next) => {
  req.body.user = req.user.id;
  req.body.tweet = req.params.tweetId || req.body.tweet;
  next();
};

const checkLike = async (req, res, next) => {
  const like =
    (await Like.findById(req.params.id)) ||
    (await Like.findOne({
      user: req.user.id,
      tweet: req.params.tweetId
    }));

  if (!like)
    return next(
      new AppError(`No like was found with id = ${req.params.id}`, 404)
    );

  if (!like.user.equals(req.user.id))
    return next(new AppError(`You are not allowed to unlike this like`, 401));

  req.params.id = like.id;
  next();
};

const createLike = handlerFactory.createOne(Like, 'like');

const deleteLike = handlerFactory.deleteOne(Like, 'like');

module.exports = {
  createLike,
  setLikeRequestBody,
  deleteLike,
  checkLike
};

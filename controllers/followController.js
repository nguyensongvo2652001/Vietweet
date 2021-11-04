const Follow = require('../models/followModel');
const handlerFactory = require('./handlerFactory');

const setFollowRequestBody = (req, res, next) => {
  req.body.user = req.user.id;
  req.body.following = req.params.followingId || req.body.following;
  next();
};

const createFollow = handlerFactory.createOne(Follow, 'follow');

module.exports = { createFollow, setFollowRequestBody };

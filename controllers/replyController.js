const multer = require('multer');
const sharp = require('sharp');

const handlerFactory = require('./handlerFactory');
const AppError = require('../utils/appError');
const Tweet = require('../models/tweetModel');
const catchAsync = require('../utils/catchAsync');

//Import reply model
const Reply = require('../models/replyModel');

//Image
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split('/')[0];

  if (fileType !== 'image')
    return cb(
      new AppError('This is not a valid image. Please try another one', 400),
      false
    );

  cb(null, true);
};

const upload = multer({ storage, fileFilter });
const uploadImage = upload.single('image');

const resizeImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.body.image = `tweet_${req.user.id}_${Date.now()}.jpeg`;
  const filePath = `public/img/tweets/${req.body.image}`;
  await sharp(req.file.buffer)
    .resize(900, 1350)
    .jpeg()
    .toFile(filePath);

  next();
});

const checkReply = async (req, res, next) => {
  const reply =
    (await Reply.findById(req.params.id)) ||
    (await Reply.findOne({
      user: req.user.id,
      tweet: req.params.tweetID
    }));

  if (!reply)
    return next(
      new AppError(`No reply was found with id = ${req.params.id}`, 404)
    );

  if (!reply.user.equals(req.user.id))
    return next(new AppError(`You are not allowed to delete this reply`, 401));

  req.params.id = reply.id;
  next();
};

const setReplyUser = (req, res, next) => {
  req.body.user = req.user.id;
  next();
};

const setReplyTweet = (req, res, next) => {
  req.body.tweet = req.params.tweet || req.body.tweet;
  next();
};

const createReply = handlerFactory.createOne(Reply, 'reply', [
  'user',
  'tweet',
  'content',
  'image'
]);

const deleteReply = handlerFactory.deleteOne(Reply, 'reply');

const setReplyFilterQuery = catchAsync(async (req, res, next) => {
  const replies = await Tweet.find({ tweet: req.body.tweet });
  const replyUsers = replies.map(reply => reply.user);

  req.filterQuery = {
    $and: [{ user: { $in: replyUsers } }, { tweet: req.body.tweet }]
  };

  req.query.sort = 'dateReplied';

  next();
});

const getAllReplies = handlerFactory.getAll(Reply, 'reply');

module.exports = {
  uploadImage,
  resizeImage,
  setReplyUser,
  setReplyTweet,

  checkReply,
  createReply,
  deleteReply,

  getAllReplies,
  setReplyFilterQuery
};

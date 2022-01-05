const multer = require('multer');
const sharp = require('sharp');

const handlerFactory = require('./handlerFactory');
const Tweet = require('../models/tweetModel');
const Follow = require('../models/followModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

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
    .jpeg({ quality: 80 })
    .toFile(filePath);

  next();
});

const setTweetUser = (req, res, next) => {
  req.body.user = req.user.id;
  next();
};

const createTweet = handlerFactory.createOne(
  Tweet,
  'tweet',
  ['content', 'image', 'user'],
  { path: 'user' }
);

const setFeedFilterQuery = catchAsync(async (req, res, next) => {
  const followDocs = await Follow.find({ user: req.user._id });
  const followings = followDocs.map(followDoc => followDoc.following);

  req.filterQuery = {
    $or: [{ user: { $in: followings } }, { user: req.user._id }]
  };

  req.query.sort = 'dateTweeted';

  next();
});

const setAllTweetsFilterQuery = (req, res, next) => {
  if (req.params.userId) req.filterQuery = { user: req.params.userId };
  next();
};

const getAllTweets = handlerFactory.getAll(Tweet, 'tweets');

module.exports = {
  createTweet,
  uploadImage,
  resizeImage,
  setTweetUser,
  setFeedFilterQuery,
  setAllTweetsFilterQuery,
  getAllTweets
};

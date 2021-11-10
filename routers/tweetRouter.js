const express = require('express');

const authController = require('../controllers/authController');
const tweetController = require('../controllers/tweetController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.get(
  '/mine',
  tweetController.setMyTweetFilterQuery,
  tweetController.getAllTweets
);

router
  .route('/')
  .get(tweetController.getAllTweets)
  .post(
    tweetController.uploadImage,
    tweetController.resizeImage,
    tweetController.setTweetUser,
    tweetController.createTweet
  );

module.exports = router;

const express = require('express');

const authController = require('../controllers/authController');
const tweetController = require('../controllers/tweetController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.get(
  '/feed',
  tweetController.setFeedFilterQuery,
  tweetController.getAllTweets
);

router
  .route('/')
  .get(tweetController.setAllTweetsFilterQuery, tweetController.getAllTweets)
  .post(
    tweetController.uploadImage,
    tweetController.resizeImage,
    tweetController.setTweetUser,
    tweetController.createTweet
  );

module.exports = router;

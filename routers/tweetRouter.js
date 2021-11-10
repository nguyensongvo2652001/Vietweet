const express = require('express');

const authController = require('../controllers/authController');
const tweetController = require('../controllers/tweetController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .post(
    tweetController.uploadImage,
    tweetController.resizeImage,
    tweetController.setTweetUser,
    tweetController.createTweet
  );

module.exports = router;

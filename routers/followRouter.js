const express = require('express');

const followController = require('../controllers/followController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  authController.protect,
  followController.setFollowRequestBody,
  followController.createFollow
);

module.exports = router;

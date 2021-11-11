const express = require('express');
const authController = require('../controllers/authController');
const followController = require('../controllers/followController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router.use(authController.protect);
router.get('/:id/followers', followController.getFollowers);
router.get('/:id/followings', followController.getFollowings);

router.post(
  '/follow/:followingId',
  followController.setFollowRequestBody,
  followController.createFollow
);
router.delete(
  '/unfollow/:followingId',
  followController.checkFollowUser,
  followController.deleteFollow
);

module.exports = router;

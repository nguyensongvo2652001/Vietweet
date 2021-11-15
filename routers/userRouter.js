const express = require('express');
const authController = require('../controllers/authController');
const user
const followController = require('../controllers/followController');
const tweetRouter = require('../routers/tweetRouter');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router.use(authController.protect);

router.get('/:id/followers', followController.getFollowers);
router.get('/:id/followings', followController.getFollowings);

router.use('/:userId/tweets', tweetRouter);

module.exports = router;

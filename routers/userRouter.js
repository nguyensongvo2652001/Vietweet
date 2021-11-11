const express = require('express');
const authController = require('../controllers/authController');
const followController = require('../controllers/followController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router.use(authController.protect);
router.get('/:id/followers', followController.getFollowers);
router.get('/:id/followings', followController.getFollowings);

module.exports = router;

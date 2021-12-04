const express = require('express');

const viewController = require('../controllers/viewController');

const router = express.Router();

router.use(viewController.isLogin);

router.get(
  '/',
  viewController.redirectIfLogin,
  viewController.loginViewController
);
router.get(
  '/forgotPassword',
  viewController.redirectIfLogin,
  viewController.forgotPasswordViewController
);
router.get(
  '/resetPassword/:token',
  viewController.redirectIfLogin,
  viewController.resetPasswordViewController
);

router.use(viewController.redirectIfNotLogin);
router.get('/homepage', viewController.homepageViewController);
router.get(
  '/profile/me',
  viewController.setCurrentUser,
  viewController.profileViewController
);
router.get('/profile/:username', viewController.profileViewController);
router.get('/tweet/:id', viewController.tweetDetailViewController);

module.exports = router;

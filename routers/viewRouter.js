const express = require('express');

const viewController = require('../controllers/viewController');

const router = express.Router();

router.use(viewController.isLogin);

router.get(
  '/',
  viewController.redirectIfLogin,
  viewController.loginViewController
);

router.use(viewController.redirectIfNotLogin);
router.get('/homepage', viewController.homepageViewController);

module.exports = router;

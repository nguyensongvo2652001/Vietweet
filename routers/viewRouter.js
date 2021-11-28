const express = require('express');

const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/homepage', viewController.homepageViewController);
router.get('/', viewController.loginViewController);

module.exports = router;

const express = require('express');

const followController = require('../controllers/followController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router
  .route('/')
  .post(followController.setFollowRequestBody, followController.createFollow);

router
  .route('/:id')
  .delete(followController.checkFollowUser, followController.deleteFollow);

module.exports = router;

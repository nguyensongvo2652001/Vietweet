const express = require('express');

const likeController = require('../controllers/likeController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router
  .route('/')
  .post(likeController.setLikeRequestBody, likeController.createLike);

router
  .route('/:id')
  .delete(likeController.checkLike, likeController.deleteLike);

module.exports = router;
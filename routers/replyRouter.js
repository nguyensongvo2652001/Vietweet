const express = require('express');

const replyController = require('../controllers/replyController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router
  .route('/')
  .post(
    replyController.uploadImage,
    replyController.resizeImage,
    replyController.setReplyUser,
    replyController.createReply
  );
router
  .route('/:id')
  .delete(replyController.checkReply, replyController.deleteReply);

module.exports = router;

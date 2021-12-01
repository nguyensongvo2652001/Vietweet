const express = require('express');

const replyController = require('../controllers/replyController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router
  .route('/:id')
  .post(
    replyController.uploadImage,
    replyController.resizeImage,
    replyController.setReplyTweet,
    replyController.setReplyUser,
    replyController.createReply
  )
  .delete(replyController.checkReply, replyController.deleteReply)
  .get(replyController.setReplyFilterQuery, replyController.getAllReplies);

module.exports = router;

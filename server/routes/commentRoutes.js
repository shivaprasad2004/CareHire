const express = require('express');
const router = express.Router({ mergeParams: true });
const commentController = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { createCommentSchema } = require('../validators/comment.validator');

router.use(protect);

router.route('/')
  .get(commentController.getComments)
  .post(validate(createCommentSchema), commentController.addComment);

router.route('/:commentId')
  .delete(commentController.deleteComment);

module.exports = router;

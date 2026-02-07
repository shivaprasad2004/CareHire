const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/CommentController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { createPostSchema } = require('../validators/post.validator');

router.use(protect);

// Post routes
router.get('/', postController.getFeed);
router.post('/', validate(createPostSchema), postController.createPost);
router.get('/search', postController.searchPosts);
router.get('/author/:authorId', postController.getPostsByAuthor);
router.get('/:id', postController.getPostById);
router.post('/:postId/like', postController.toggleLike);

// Comment routes (nested under posts)
router.post('/:postId/comments', commentController.createComment);
router.get('/:postId/comments', commentController.getCommentsByPost);

module.exports = router;
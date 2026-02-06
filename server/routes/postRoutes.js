const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const likeController = require('../controllers/likeController'); // New controller
const commentRouter = require('./commentRoutes'); // New router
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { createPostSchema } = require('../validators/post.validator');

router.use(protect);

// Re-route to other resource routers
router.use('/:postId/comments', commentRouter);

router.get('/', postController.getFeed);
router.post('/', validate(createPostSchema), postController.createPost);

// Use likeController for likes
router.route('/:postId/like')
    .post(likeController.toggleLike)
    .get(likeController.getLikes);

module.exports = router;

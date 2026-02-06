const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', postController.getFeed);
router.post('/', authMiddleware, postController.createPost);
router.post('/:id/like', authMiddleware, postController.likePost);

module.exports = router;

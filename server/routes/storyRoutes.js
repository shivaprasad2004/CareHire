const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', storyController.getActiveStories);
router.post('/', storyController.createStory);

module.exports = router;

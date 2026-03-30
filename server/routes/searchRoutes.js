const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, searchController.search);
router.get('/suggestions', protect, searchController.getSuggestions);
router.get('/history', protect, searchController.getSearchHistory);
router.delete('/history', protect, searchController.clearSearchHistory);

module.exports = router;

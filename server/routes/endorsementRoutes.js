const express = require('express');
const router = express.Router();
const endorsementController = require('../controllers/endorsementController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:id/endorse', protect, endorsementController.endorseSkill);
router.get('/:id/endorsements', protect, endorsementController.getEndorsements);
router.post('/:id/recommend', protect, endorsementController.writeRecommendation);
router.get('/:id/recommendations', protect, endorsementController.getRecommendations);

module.exports = router;

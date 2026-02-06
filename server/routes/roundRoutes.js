const express = require('express');
const router = express.Router();
const roundController = require('../controllers/roundController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', roundController.getMyRounds);
router.post('/', roundController.createRound);
router.patch('/:id/status', roundController.updateRoundStatus);

module.exports = router;

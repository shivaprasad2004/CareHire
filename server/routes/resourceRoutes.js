const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', resourceController.getResources);
router.post('/', resourceController.createResource);
router.post('/:id/download', resourceController.incrementDownload);

module.exports = router;

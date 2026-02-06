const express = require('express');
const router = express.Router();
const connectionController = require('../controllers/connectionController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', connectionController.getConnections);
router.get('/requests', connectionController.getPendingRequests);
router.post('/request', connectionController.sendRequest);
router.patch('/respond/:id', connectionController.respondToRequest);

module.exports = router;

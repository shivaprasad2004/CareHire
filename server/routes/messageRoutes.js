const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { sendMessageSchema } = require('../validators/message.validator');

router.use(protect);

router.get('/', messageController.getConversations);
router.post('/conversations', messageController.startConversation);
router.post('/', validate(sendMessageSchema), messageController.sendMessage);
router.get('/:conversationId', messageController.getMessages);
router.patch('/:messageId/read', messageController.markAsRead);

module.exports = router;

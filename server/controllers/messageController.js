const messageService = require('../services/message.service');
const catchAsync = require('../utils/catchAsync');

exports.getConversations = catchAsync(async (req, res, next) => {
  const conversations = await messageService.getUserConversations(req.user.id);
  
  res.status(200).json({
    status: 'success',
    data: { conversations }
  });
});

exports.startConversation = catchAsync(async (req, res, next) => {
  const { recipientId } = req.body;
  const conversation = await messageService.getOrCreateConversation(req.user.id, recipientId);
  
  res.status(200).json({
    status: 'success',
    data: { conversation }
  });
});

exports.sendMessage = catchAsync(async (req, res, next) => {
  const { conversationId, content } = req.body;
  const message = await messageService.sendMessage(req.user.id, conversationId, content);
  
  res.status(201).json({
    status: 'success',
    data: { message }
  });
});

exports.getMessages = catchAsync(async (req, res, next) => {
  const { conversationId } = req.params;
  const messages = await messageService.getMessages(conversationId);
  
  res.status(200).json({
    status: 'success',
    data: { messages }
  });
});

exports.markAsRead = catchAsync(async (req, res, next) => {
  const { messageId } = req.params;
  const message = await messageService.markAsRead(messageId, req.user.id);
  
  res.status(200).json({
    status: 'success',
    data: { message }
  });
});

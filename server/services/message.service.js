const { Message, Conversation, User } = require('../models');
const { getIO } = require('../sockets');
const AppError = require('../utils/AppError');

class MessageService {
  async sendMessage(senderId, conversationId, content) {
    const conversation = await Conversation.findByPk(conversationId);
    if (!conversation) {
      throw new AppError('Conversation not found', 404);
    }

    const message = await Message.create({
      conversationId,
      senderId,
      content
    });

    // Update conversation lastMessageAt
    await conversation.update({ lastMessageAt: new Date() });

    const fullMessage = await Message.findByPk(message.id, {
      include: [{ model: User, as: 'sender', attributes: ['id', 'firstName', 'lastName', 'avatarUrl'] }]
    });

    // Real-time emission
    try {
      const io = getIO();
      io.to(`conversation_${conversationId}`).emit('new_message', fullMessage);
    } catch (err) {
      console.warn('Socket.io not initialized or error emitting event', err);
    }

    return fullMessage;
  }

  async getMessages(conversationId, limit = 50, offset = 0) {
    return await Message.findAll({
      where: { conversationId },
      order: [['createdAt', 'DESC']],
      limit,
      offset,
      include: [{ model: User, as: 'sender', attributes: ['id', 'firstName', 'lastName', 'avatarUrl'] }]
    });
  }

  async markAsRead(messageId, userId) {
    const message = await Message.findByPk(messageId);
    if (!message) {
      throw new AppError('Message not found', 404);
    }
    
    // Ensure user is part of the conversation (basic check logic needed if participants table exists)
    // For now, assuming if they can access the message ID, they can read it.
    
    await message.update({ isRead: true });
    return message;
  }
}

module.exports = new MessageService();

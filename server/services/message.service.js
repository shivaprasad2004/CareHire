const { Message, Conversation, User } = require('../models');
const { getIO } = require('../sockets');
const AppError = require('../utils/AppError');

class MessageService {
  async getUserConversations(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const conversations = await user.getConversations({
      include: [
        {
          model: User,
          as: 'participants',
          attributes: ['id', 'firstName', 'lastName', 'avatarUrl', 'specialty', 'status'],
          through: { attributes: [] }
        },
        {
          model: Message,
          as: 'messages',
          limit: 1,
          order: [['createdAt', 'DESC']]
        }
      ],
      order: [['lastMessageAt', 'DESC']]
    });

    return conversations;
  }

  async getOrCreateConversation(userId, recipientId) {
    if (userId === recipientId) {
      throw new AppError('Cannot create conversation with yourself', 400);
    }

    const recipient = await User.findByPk(recipientId);
    if (!recipient) {
      throw new AppError('Recipient not found', 404);
    }

    // Find existing conversation
    // This query is a bit complex because we need to find a conversation where BOTH users are participants.
    // We can do this by finding all conversations of user 1, then filtering for user 2.
    // Or doing a raw query or using Sequelize operators on the join table.
    
    // Approach: Get all conversation IDs for user 1
    const userConversations = await Conversation.findAll({
      include: [{
        model: User,
        as: 'participants',
        where: { id: userId },
        attributes: []
      }]
    });
    
    const conversationIds = userConversations.map(c => c.id);
    
    // Now check if any of these have recipient as participant
    const existingConversation = await Conversation.findOne({
      where: {
        id: conversationIds
      },
      include: [{
        model: User,
        as: 'participants',
        where: { id: recipientId }
      }]
    });

    if (existingConversation) {
      // Return full conversation details expected by frontend
      return await Conversation.findByPk(existingConversation.id, {
        include: [
          {
            model: User,
          as: 'participants',
          attributes: ['id', 'firstName', 'lastName', 'avatarUrl', 'specialty', 'status'],
          through: { attributes: [] }
        },
          {
            model: Message,
            as: 'messages',
            limit: 1,
            order: [['createdAt', 'DESC']]
          }
        ]
      });
    }

    // Create new conversation
    const newConversation = await Conversation.create({});
    await newConversation.addParticipants([userId, recipientId]);

    // Return the new conversation with participants loaded
    return await Conversation.findByPk(newConversation.id, {
      include: [
        {
          model: User,
          as: 'participants',
          attributes: ['id', 'firstName', 'lastName', 'avatarUrl', 'specialty', 'status'],
          through: { attributes: [] }
        },
        {
          model: Message,
          as: 'messages',
          limit: 1,
          order: [['createdAt', 'DESC']]
        }
      ]
    });
  }

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
      logger.warn(`Socket.io not initialized or error emitting event: ${err.message}`);
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

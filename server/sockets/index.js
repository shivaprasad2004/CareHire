const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { User, Message, Conversation, Notification } = require('../models');
const logger = require('../utils/logger');

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "*",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);
      
      if (!user) {
        return next(new Error('User not found'));
      }
      
      socket.user = user;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', async (socket) => {
    logger.info(`User connected: ${socket.user.email} (${socket.id})`);

    // Update user status to online
    try {
      await User.update({ status: 'online', socketId: socket.id }, { where: { id: socket.user.id } });
      io.emit('user_status_change', { userId: socket.user.id, status: 'online' });
    } catch (error) {
      logger.error(`Error updating user status: ${error.message}`);
    }

    // Join conversation rooms
    socket.on('join_conversation', (conversationId) => {
      socket.join(`conversation_${conversationId}`);
      logger.info(`User ${socket.user.id} joined conversation ${conversationId}`);
    });

    // Leave conversation rooms
    socket.on('leave_conversation', (conversationId) => {
      socket.leave(`conversation_${conversationId}`);
      logger.info(`User ${socket.user.id} left conversation ${conversationId}`);
    });

    // Handle typing events
    socket.on('typing', ({ conversationId, isTyping }) => {
      socket.to(`conversation_${conversationId}`).emit('user_typing', {
        userId: socket.user.id,
        conversationId,
        isTyping
      });
    });

    // Send message
    socket.on('send_message', async ({ conversationId, content }) => {
      try {
        const message = await Message.create({
          conversationId,
          senderId: socket.user.id,
          content
        });

        const fullMessage = await Message.findByPk(message.id, {
          include: [{ 
            model: User, 
            as: 'sender', 
            attributes: ['id', 'firstName', 'lastName', 'profilePicture'] 
          }]
        });

        // Emit to all users in the conversation room
        io.to(`conversation_${conversationId}`).emit('new_message', fullMessage);
        
        // Notify other participants (simplified logic - assuming 2 person chat for now or getting participants from conversation)
        // In a real app, you'd fetch conversation participants here to send notifications
        
        logger.info(`Message sent in conversation ${conversationId} by user ${socket.user.id}`);
      } catch (err) {
        logger.error(`Error sending message: ${err.message}`);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    socket.on('disconnect', async () => {
      logger.info(`User disconnected: ${socket.user.email}`);
      try {
        await User.update({ status: 'offline', socketId: null }, { where: { id: socket.user.id } });
        io.emit('user_status_change', { userId: socket.user.id, status: 'offline' });
      } catch (error) {
        logger.error(`Error updating user status on disconnect: ${error.message}`);
      }
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

module.exports = { initializeSocket, getIO };

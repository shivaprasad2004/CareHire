const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { User, Message, Conversation, Notification } = require('../models');

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "*",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

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
    console.log(`User connected: ${socket.user.email} (${socket.id})`);
    
    // Update user status
    await User.update({ status: 'online', socketId: socket.id }, { where: { id: socket.user.id } });
    io.emit('user_status_change', { userId: socket.user.id, status: 'online' });

    // Join conversation rooms
    socket.on('join_conversation', (conversationId) => {
      socket.join(`conversation_${conversationId}`);
      console.log(`User ${socket.user.id} joined conversation ${conversationId}`);
    });

    // Handle new message
    socket.on('send_message', async (data) => {
      // data: { conversationId, content, type }
      try {
        const message = await Message.create({
          conversationId: data.conversationId,
          senderId: socket.user.id,
          content: data.content,
          type: data.type || 'text'
        });

        // Populate sender info
        const fullMessage = await Message.findByPk(message.id, {
          include: [{ model: User, as: 'sender', attributes: ['id', 'firstName', 'lastName', 'avatarUrl'] }]
        });

        io.to(`conversation_${data.conversationId}`).emit('new_message', fullMessage);
        
        // Notify other participants (simplified for now)
        // Ideally, find participants of conversation and send notifications if they are not in the room
      } catch (err) {
        console.error('Error sending message:', err);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    socket.on('disconnect', async () => {
      console.log(`User disconnected: ${socket.user.email}`);
      await User.update({ status: 'offline', socketId: null }, { where: { id: socket.user.id } });
      io.emit('user_status_change', { userId: socket.user.id, status: 'offline' });
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

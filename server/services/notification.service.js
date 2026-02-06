const { Notification } = require('../models');
const { getIO } = require('../sockets');

class NotificationService {
  async createNotification(userId, type, message, data = {}) {
    const notification = await Notification.create({
      userId,
      type,
      message,
      data
    });

    // Real-time emission
    try {
      const io = getIO();
      // Emit to specific user's room (assuming they join room 'user_{userId}')
      // Or we can find their socketId from User model if we store it
      // Let's assume we use a room pattern 'user_{userId}' which is common
      io.to(`user_${userId}`).emit('new_notification', notification);
    } catch (err) {
      console.warn('Socket.io not initialized or error emitting event', err);
    }

    return notification;
  }

  async getUserNotifications(userId, limit = 20, offset = 0) {
    return await Notification.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });
  }

  async markAsRead(notificationId, userId) {
    const notification = await Notification.findOne({ where: { id: notificationId, userId } });
    if (!notification) {
      throw new Error('Notification not found');
    }
    
    await notification.update({ isRead: true });
    return notification;
  }
  
  async markAllAsRead(userId) {
      await Notification.update({ isRead: true }, { where: { userId, isRead: false } });
      return { message: 'All notifications marked as read' };
  }
}

module.exports = new NotificationService();

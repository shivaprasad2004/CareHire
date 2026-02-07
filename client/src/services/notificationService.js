import BaseService from './BaseService';

class NotificationService extends BaseService {
  constructor() {
    super('/notifications');
  }

  async getAllNotifications() {
    return this.get('/');
  }

  async markAsRead(id) {
    return this.patch(`/${id}/read`);
  }
}

export const notificationService = new NotificationService();

import BaseService from './BaseService';

class MessageService extends BaseService {
  constructor() {
    super('/messages');
  }

  async getConversations() {
    return this.get('/');
  }

  async getMessages(conversationId) {
    return this.get(`/${conversationId}`);
  }

  async sendMessage(conversationId, content) {
    return this.post('/', { conversationId, content });
  }

  async startConversation(recipientId) {
    return this.post('/conversations', { recipientId });
  }
}

export const messageService = new MessageService();

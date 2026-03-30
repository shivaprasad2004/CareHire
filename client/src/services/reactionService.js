import BaseService from './BaseService';

class ReactionService extends BaseService {
  constructor() {
    super('/posts');
  }

  async addReaction(postId, type) {
    return this.post(`/${postId}/react`, { type });
  }

  async removeReaction(postId) {
    return this.delete(`/${postId}/react`);
  }
}

export const reactionService = new ReactionService();

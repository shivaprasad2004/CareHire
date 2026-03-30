import BaseService from './BaseService';

class CommentService extends BaseService {
  constructor() {
    super('/posts');
  }

  async getComments(postId) {
    return this.get(`/${postId}/comments`);
  }

  async createComment(postId, data) {
    return this.post(`/${postId}/comments`, data);
  }

  async deleteComment(commentId) {
    const base = new BaseService('/comments');
    return base.delete(`/${commentId}`);
  }
}

export const commentService = new CommentService();

import BaseService from './BaseService';

class PostService extends BaseService {
  constructor() {
    super('/posts');
  }

  async getAllPosts(page = 1, limit = 20) {
    return this.get(`/?page=${page}&limit=${limit}`);
  }

  async getPost(postId) {
    return this.get(`/${postId}`);
  }

  async createPost(postData) {
    return this.post('/', postData);
  }

  async updatePost(postId, data) {
    return this.put(`/${postId}`, data);
  }

  async deletePost(postId) {
    return this.delete(`/${postId}`);
  }

  async likePost(postId) {
    return this.post(`/${postId}/like`);
  }

  async unlikePost(postId) {
    return this.delete(`/${postId}/like`);
  }

  async reactToPost(postId, type) {
    return this.post(`/${postId}/react`, { type });
  }

  async removeReaction(postId) {
    return this.delete(`/${postId}/react`);
  }

  async sharePost(postId, content) {
    return this.post(`/${postId}/share`, { content });
  }

  async getFeedPosts(page = 1) {
    return this.get(`/feed?page=${page}`);
  }
}

export const postService = new PostService();

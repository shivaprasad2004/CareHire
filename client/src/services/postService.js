import BaseService from './BaseService';

class PostService extends BaseService {
  constructor() {
    super('/posts');
  }

  async getAllPosts() {
    return this.get('/');
  }

  async createPost(postData) {
    return this.post('/', postData);
  }

  async likePost(postId) {
    return this.post(`/${postId}/like`);
  }

  async unlikePost(postId) {
    return this.delete(`/${postId}/like`);
  }
}

export default new PostService();

import BaseService from './BaseService';

class StoryService extends BaseService {
  constructor() {
    super('/stories');
  }

  async getAllStories() {
    return this.get('/');
  }

  async getMyStories() {
    return this.get('/me');
  }

  async createStory(storyData) {
    // Handling FormData for file uploads if needed, 
    // but BaseService sets Content-Type to json by default.
    // If uploading files, we might need to override headers.
    return this.post('/', storyData);
  }
}

export const storyService = new StoryService();

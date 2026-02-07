const userService = require('../services/userService');
const postService = require('../services/PostService');
const authService = require('../services/AuthService');
const jobService = require('../services/JobService');
const messageService = require('../services/MessageService');

class ServiceFactory {
  static create(serviceName) {
    switch (serviceName) {
      case 'user':
        return userService;
      case 'post':
        return postService;
      case 'auth':
        return authService;
      case 'job':
        return jobService;
      case 'message':
        return messageService;
      default:
        throw new Error(`Service ${serviceName} not found`);
    }
  }

  static createRepository(repositoryName) {
    switch (repositoryName) {
      case 'user':
        return require('../repositories/UserRepository');
      case 'post':
        return require('../repositories/PostRepository');
      case 'like':
        return require('../repositories/LikeRepository');
      default:
        throw new Error(`Repository ${repositoryName} not found`);
    }
  }
}

module.exports = ServiceFactory;
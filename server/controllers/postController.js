const BaseController = require('./BaseController');
const postService = require('../services/PostService');
const AppError = require('../utils/AppError');

class PostController extends BaseController {
  constructor() {
    super(postService);
    
    // Bind methods to maintain context
    this.createPost = this.createPost.bind(this);
    this.getFeed = this.getFeed.bind(this);
    this.getPostById = this.getPostById.bind(this);
    this.getPostsByAuthor = this.getPostsByAuthor.bind(this);
    this.searchPosts = this.searchPosts.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
  }

  async createPost(req, res, next) {
    return this.handleServiceCall(async () => {
      const authorId = this.extractUserId(req);
      if (!authorId) {
        throw new AppError('User not authenticated', 401);
      }
      
      return await this.service.createPost(req.body, authorId);
    }, req, res, next);
  }

  async getFeed(req, res, next) {
    return this.handleServiceCall(async () => {
      const pagination = this.extractPagination(req);
      return await this.service.getFeed(pagination);
    }, req, res, next);
  }

  async getPostById(req, res, next) {
    return this.handleServiceCall(async () => {
      const { id } = req.params;
      return await this.service.getPostById(id);
    }, req, res, next);
  }

  async getPostsByAuthor(req, res, next) {
    return this.handleServiceCall(async () => {
      const { authorId } = req.params;
      const pagination = this.extractPagination(req);
      return await this.service.getPostsByAuthor(authorId, pagination);
    }, req, res, next);
  }

  async searchPosts(req, res, next) {
    return this.handleServiceCall(async () => {
      const { q } = req.query;
      const pagination = this.extractPagination(req);
      return await this.service.searchPosts(q, pagination);
    }, req, res, next);
  }

  async toggleLike(req, res, next) {
    return this.handleServiceCall(async () => {
      const userId = this.extractUserId(req);
      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }
      
      const { postId } = req.params;
      return await this.service.toggleLike(postId, userId);
    }, req, res, next);
  }
}

module.exports = new PostController();
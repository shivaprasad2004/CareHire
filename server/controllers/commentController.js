const BaseController = require('./BaseController');
const commentService = require('../services/CommentService');
const AppError = require('../utils/AppError');

class CommentController extends BaseController {
  constructor() {
    super(commentService);
    
    // Bind methods to maintain context
    this.createComment = this.createComment.bind(this);
    this.getCommentsByPost = this.getCommentsByPost.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  async createComment(req, res, next) {
    return this.handleServiceCall(async () => {
      const userId = this.extractUserId(req);
      const { postId } = req.params;
      
      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }
      
      this.validateRequiredBody(req, ['content']);
      
      return await this.service.createComment({
        content: req.body.content,
        postId: parseInt(postId),
        authorId: userId
      });
    }, req, res, next);
  }

  async getCommentsByPost(req, res, next) {
    return this.handleServiceCall(async () => {
      const { postId } = req.params;
      const pagination = this.extractPagination(req);
      
      return await this.service.getCommentsByPost(parseInt(postId), pagination);
    }, req, res, next);
  }

  async updateComment(req, res, next) {
    return this.handleServiceCall(async () => {
      const userId = this.extractUserId(req);
      const { commentId } = req.params;
      
      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }
      
      this.validateRequiredBody(req, ['content']);
      
      return await this.service.updateComment(parseInt(commentId), userId, req.body.content);
    }, req, res, next);
  }

  async deleteComment(req, res, next) {
    return this.handleServiceCall(async () => {
      const userId = this.extractUserId(req);
      const { commentId } = req.params;
      
      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }
      
      return await this.service.deleteComment(parseInt(commentId), userId);
    }, req, res, next);
  }
}

module.exports = new CommentController();
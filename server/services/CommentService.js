const BaseService = require('./BaseService');
const commentRepository = require('../repositories/CommentRepository');
const postRepository = require('../repositories/PostRepository');
const AppError = require('../utils/AppError');

class CommentService extends BaseService {
  constructor() {
    super(commentRepository);
  }

  async createComment(commentData) {
    this.validateCommentData(commentData);
    
    const postExists = await postRepository.exists(commentData.postId);
    if (!postExists) {
      throw new AppError('Post not found', 404);
    }
    
    const comment = await commentRepository.create(commentData);
    
    return await this.getCommentById(comment.id);
  }

  async getCommentsByPost(postId, pagination = {}) {
    const postExists = await postRepository.exists(postId);
    if (!postExists) {
      throw new AppError('Post not found', 404);
    }
    
    const result = await commentRepository.getCommentsByPost(postId, pagination);
    
    return {
      comments: result.rows.map(comment => this.formatCommentResponse(comment)),
      total: result.count,
      totalPages: Math.ceil(result.count / (pagination.limit || 10)),
      currentPage: pagination.page || 1
    };
  }

  async getCommentById(id) {
    const comment = await commentRepository.findById(id, {
      include: [
        {
          model: require('../models').User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'avatarUrl', 'specialty']
        },
        {
          model: require('../models').Post,
          as: 'post',
          attributes: ['id', 'content', 'type']
        }
      ]
    });
    
    if (!comment) {
      throw new AppError('Comment not found', 404);
    }
    
    return this.formatCommentResponse(comment);
  }

  async updateComment(commentId, userId, content) {
    const comment = await commentRepository.findById(commentId);
    
    if (!comment) {
      throw new AppError('Comment not found', 404);
    }
    
    if (comment.authorId !== userId) {
      throw new AppError('You can only edit your own comments', 403);
    }
    
    await commentRepository.update(commentId, { content });
    
    return await this.getCommentById(commentId);
  }

  async deleteComment(commentId, userId) {
    const comment = await commentRepository.findById(commentId);
    
    if (!comment) {
      throw new AppError('Comment not found', 404);
    }
    
    if (comment.authorId !== userId) {
      throw new AppError('You can only delete your own comments', 403);
    }
    
    await commentRepository.delete(commentId);
    
    return { message: 'Comment deleted successfully' };
  }

  validateCommentData(data) {
    const requiredFields = ['content', 'postId', 'authorId'];
    this.validateRequiredFields(data, requiredFields);
    
    if (data.content && data.content.trim().length < 1) {
      throw new AppError('Comment content cannot be empty', 400);
    }
    
    if (data.content && data.content.length > 1000) {
      throw new AppError('Comment content cannot exceed 1000 characters', 400);
    }
  }

  formatCommentResponse(comment) {
    const commentObj = comment.toJSON ? comment.toJSON() : comment;
    
    return {
      id: commentObj.id,
      content: commentObj.content,
      author: commentObj.author ? {
        id: commentObj.author.id,
        name: `${commentObj.author.firstName} ${commentObj.author.lastName}`,
        avatarUrl: commentObj.author.avatarUrl,
        specialty: commentObj.author.specialty
      } : null,
      post: commentObj.post ? {
        id: commentObj.post.id,
        content: commentObj.post.content,
        type: commentObj.post.type
      } : null,
      createdAt: commentObj.createdAt,
      updatedAt: commentObj.updatedAt
    };
  }
}

module.exports = new CommentService();
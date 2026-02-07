const BaseService = require('./BaseService');
const postRepository = require('../repositories/PostRepository');
const likeRepository = require('../repositories/LikeRepository');
const AppError = require('../utils/AppError');

class PostService extends BaseService {
  constructor() {
    super(postRepository);
  }

  async createPost(postData, authorId) {
    this.validatePostData(postData);
    
    const post = await this.repository.createPost(postData, authorId);
    
    return await this.getPostById(post.id);
  }

  async getFeed(pagination = {}) {
    const result = await this.repository.getFeedWithRelations(pagination);
    
    return {
      posts: result.rows.map(post => this.formatPostResponse(post)),
      total: result.count,
      totalPages: Math.ceil(result.count / (pagination.limit || 10)),
      currentPage: pagination.page || 1
    };
  }

  async getPostById(id) {
    const post = await this.repository.getPostByIdWithRelations(id);
    
    if (!post) {
      throw new AppError('Post not found', 404);
    }
    
    return this.formatPostResponse(post);
  }

  async getPostsByAuthor(authorId, pagination = {}) {
    const result = await this.repository.getPostsByAuthor(authorId, pagination);
    
    return {
      posts: result.rows.map(post => this.formatPostResponse(post)),
      total: result.count,
      totalPages: Math.ceil(result.count / (pagination.limit || 10)),
      currentPage: pagination.page || 1
    };
  }

  async searchPosts(searchTerm, pagination = {}) {
    if (!searchTerm || searchTerm.trim().length < 2) {
      throw new AppError('Search term must be at least 2 characters long', 400);
    }
    
    const result = await this.repository.searchPosts(searchTerm.trim(), pagination);
    
    return {
      posts: result.rows.map(post => this.formatPostResponse(post)),
      total: result.count,
      totalPages: Math.ceil(result.count / (pagination.limit || 10)),
      currentPage: pagination.page || 1
    };
  }

  async toggleLike(postId, userId) {
    const postExists = await this.repository.exists(postId);
    if (!postExists) {
      throw new AppError('Post not found', 404);
    }
    
    const existingLike = await likeRepository.findByPostAndUser(postId, userId);
    
    let liked = false;
    if (existingLike) {
      await likeRepository.delete(existingLike.id);
      liked = false;
    } else {
      await likeRepository.create({ postId, userId });
      liked = true;
    }
    
    const likesCount = await likeRepository.countByPost(postId);
    
    return { liked, likesCount };
  }

  validatePostData(data) {
    const requiredFields = ['content'];
    this.validateRequiredFields(data, requiredFields);
    
    if (data.content && data.content.trim().length < 1) {
      throw new AppError('Post content cannot be empty', 400);
    }
    
    if (data.content && data.content.length > 5000) {
      throw new AppError('Post content cannot exceed 5000 characters', 400);
    }
    
    if (data.type && !['general', 'urgent', 'smart_round'].includes(data.type)) {
      throw new AppError('Invalid post type', 400);
    }
  }

  formatPostResponse(post) {
    const postObj = post.toJSON ? post.toJSON() : post;
    
    return {
      ...postObj,
      likesCount: postObj.likes ? postObj.likes.length : 0,
      commentsCount: postObj.comments ? postObj.comments.length : 0,
      author: postObj.author ? {
        id: postObj.author.id,
        name: `${postObj.author.firstName} ${postObj.author.lastName}`,
        specialty: postObj.author.specialty,
        avatarUrl: postObj.author.avatarUrl
      } : null,
      comments: postObj.comments ? postObj.comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        author: comment.author ? {
          name: `${comment.author.firstName} ${comment.author.lastName}`,
          avatarUrl: comment.author.avatarUrl
        } : null,
        createdAt: comment.createdAt
      })) : []
    };
  }
}

module.exports = new PostService();
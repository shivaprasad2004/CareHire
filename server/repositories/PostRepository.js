const BaseRepository = require('./BaseRepository');
const { Post, User, Comment, Like } = require('../models');

class PostRepository extends BaseRepository {
  constructor() {
    super(Post);
  }

  async createPost(postData, authorId) {
    return await this.create({
      ...postData,
      authorId
    });
  }

  async getFeedWithRelations(pagination = {}) {
    const { limit = 10, offset = 0 } = pagination;

    return await this.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'specialty', 'avatarUrl']
        },
        {
          model: Comment,
          as: 'comments',
          limit: 3,
          include: [{ model: User, as: 'author', attributes: ['firstName', 'lastName'] }]
        },
        {
          model: Like,
          as: 'likes',
          attributes: ['id']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  async getPostByIdWithRelations(id) {
    return await this.findById(id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'specialty', 'avatarUrl']
        },
        {
          model: Comment,
          as: 'comments',
          include: [{ model: User, as: 'author', attributes: ['firstName', 'lastName', 'avatarUrl'] }]
        },
        {
          model: Like,
          as: 'likes',
          attributes: ['id', 'userId']
        }
      ]
    });
  }

  async getPostsByAuthor(authorId, pagination = {}) {
    const { limit = 10, offset = 0 } = pagination;

    return await this.findAndCountAll({
      where: { authorId },
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
  }

  async searchPosts(searchTerm, pagination = {}) {
    const { limit = 10, offset = 0 } = pagination;
    const { Op } = require('sequelize');

    return await this.findAndCountAll({
      where: {
        [Op.or]: [
          { content: { [Op.iLike]: `%${searchTerm}%` } },
          { title: { [Op.iLike]: `%${searchTerm}%` } }
        ]
      },
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
  }
}

module.exports = new PostRepository();
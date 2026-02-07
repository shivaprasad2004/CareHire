const BaseRepository = require('./BaseRepository');
const { Comment } = require('../models');

class CommentRepository extends BaseRepository {
  constructor() {
    super(Comment);
  }

  async findByPostAndUser(postId, userId) {
    return await this.findOne({
      where: { postId, authorId: userId }
    });
  }

  async getCommentsByPost(postId, pagination = {}) {
    const { limit = 10, offset = 0 } = pagination;
    
    return await this.findAndCountAll({
      where: { postId },
      include: [
        {
          model: require('../models').User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'avatarUrl', 'specialty']
        }
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
  }

  async getCommentsByAuthor(authorId, pagination = {}) {
    const { limit = 10, offset = 0 } = pagination;
    
    return await this.findAndCountAll({
      where: { authorId },
      include: [
        {
          model: require('../models').Post,
          as: 'post',
          attributes: ['id', 'content', 'type']
        }
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
  }

  async countByPost(postId) {
    return await this.count({
      where: { postId }
    });
  }

  async countByAuthor(authorId) {
    return await this.count({
      where: { authorId }
    });
  }
}

module.exports = new CommentRepository();
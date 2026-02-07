const BaseRepository = require('./BaseRepository');
const { Like } = require('../models');

class LikeRepository extends BaseRepository {
  constructor() {
    super(Like);
  }

  async findByPostAndUser(postId, userId) {
    return await this.findOne({
      where: { postId, userId }
    });
  }

  async countByPost(postId) {
    return await this.count({
      where: { postId }
    });
  }

  async countByUser(userId) {
    return await this.count({
      where: { userId }
    });
  }

  async getUserLikedPosts(userId, pagination = {}) {
    const { limit = 10, offset = 0 } = pagination;
    
    return await this.findAndCountAll({
      where: { userId },
      include: ['post'],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
  }

  async bulkCreate(likesData) {
    return await this.model.bulkCreate(likesData);
  }

  async bulkDelete(whereClause) {
    return await this.model.destroy({
      where: whereClause
    });
  }
}

module.exports = new LikeRepository();
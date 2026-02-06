const { Story, User } = require('../models');
const { Op } = require('sequelize');

class StoryService {
  async getActiveStories() {
    const now = new Date();
    return await Story.findAll({
      where: {
        expiresAt: { [Op.gt]: now }
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'avatarUrl']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  async createStory(storyData, userId) {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Stories last 24 hours

    return await Story.create({
      ...storyData,
      userId,
      expiresAt
    });
  }
}

module.exports = new StoryService();

const { User, Job, Organization, Post, SearchHistory } = require('../models');
const { Op } = require('sequelize');

class SearchService {
  async search(query, type, pagination = {}) {
    const limit = pagination.limit || 10;
    const offset = pagination.offset || 0;
    const results = {};

    if (!type || type === 'all' || type === 'users') {
      const users = await User.findAndCountAll({
        where: {
          [Op.or]: [
            { firstName: { [Op.iLike]: `%${query}%` } },
            { lastName: { [Op.iLike]: `%${query}%` } },
            { specialty: { [Op.iLike]: `%${query}%` } },
            { title: { [Op.iLike]: `%${query}%` } }
          ]
        },
        attributes: ['id', 'firstName', 'lastName', 'avatarUrl', 'title', 'specialty', 'location', 'headline', 'slug'],
        limit, offset
      });
      results.users = users;
    }

    if (!type || type === 'all' || type === 'jobs') {
      const jobs = await Job.findAndCountAll({
        where: {
          [Op.or]: [
            { title: { [Op.iLike]: `%${query}%` } },
            { description: { [Op.iLike]: `%${query}%` } },
            { location: { [Op.iLike]: `%${query}%` } }
          ],
          status: 'Open'
        },
        limit, offset, order: [['createdAt', 'DESC']]
      });
      results.jobs = jobs;
    }

    if (!type || type === 'all' || type === 'organizations') {
      const organizations = await Organization.findAndCountAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${query}%` } },
            { description: { [Op.iLike]: `%${query}%` } },
            { industry: { [Op.iLike]: `%${query}%` } }
          ]
        },
        limit, offset
      });
      results.organizations = organizations;
    }

    if (!type || type === 'all' || type === 'posts') {
      const posts = await Post.findAndCountAll({
        where: { content: { [Op.iLike]: `%${query}%` } },
        limit, offset, order: [['createdAt', 'DESC']],
        include: [{ model: User, as: 'author', attributes: ['id', 'firstName', 'lastName', 'avatarUrl'] }]
      });
      results.posts = posts;
    }

    return results;
  }

  async getSuggestions(query) {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${query}%` } },
          { lastName: { [Op.iLike]: `%${query}%` } }
        ]
      },
      attributes: ['id', 'firstName', 'lastName', 'avatarUrl', 'title'],
      limit: 5
    });
    const jobs = await Job.findAll({
      where: { title: { [Op.iLike]: `%${query}%` }, status: 'Open' },
      attributes: ['id', 'title', 'location'],
      limit: 3
    });
    const organizations = await Organization.findAll({
      where: { name: { [Op.iLike]: `%${query}%` } },
      attributes: ['id', 'name', 'logo', 'slug'],
      limit: 3
    });
    return { users, jobs, organizations };
  }

  async saveSearch(userId, query, type, resultId) {
    return await SearchHistory.create({ userId, query, type, resultId });
  }

  async getSearchHistory(userId) {
    return await SearchHistory.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 10
    });
  }

  async clearSearchHistory(userId) {
    await SearchHistory.destroy({ where: { userId } });
    return { message: 'Search history cleared' };
  }
}

module.exports = new SearchService();

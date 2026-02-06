const { Resource, User } = require('../models');
const { Op } = require('sequelize');

class ResourceService {
  async getResources(query) {
    const { search, category, type } = query;
    const where = {};

    if (category && category !== 'All') where.category = category;
    if (type) where.type = type;
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { author: { [Op.like]: `%${search}%` } }
      ];
    }

    return await Resource.findAll({
      where,
      order: [['downloadCount', 'DESC']] // Popular first
    });
  }

  async createResource(resourceData, userId) {
    return await Resource.create({
      ...resourceData,
      uploadedBy: userId
    });
  }

  async incrementDownload(resourceId) {
    const resource = await Resource.findByPk(resourceId);
    if (resource) {
      resource.downloadCount += 1;
      await resource.save();
    }
    return resource;
  }
}

module.exports = new ResourceService();

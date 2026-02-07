const { Op } = require('sequelize');

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(options = {}) {
    return await this.model.findAll(options);
  }

  async findById(id, options = {}) {
    return await this.model.findByPk(id, options);
  }

  async findOne(options = {}) {
    return await this.model.findOne(options);
  }

  async create(data, options = {}) {
    return await this.model.create(data, options);
  }

  async update(id, data, options = {}) {
    const [updated] = await this.model.update(data, {
      where: { id },
      ...options
    });
    return updated;
  }

  async delete(id, options = {}) {
    return await this.model.destroy({
      where: { id },
      ...options
    });
  }

  async findAndCountAll(options = {}) {
    return await this.model.findAndCountAll(options);
  }

  async count(options = {}) {
    return await this.model.count(options);
  }

  async exists(id) {
    const count = await this.model.count({ where: { id } });
    return count > 0;
  }

  buildWhereClause(filters) {
    const where = {};
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        where[key] = filters[key];
      }
    });
    return where;
  }
}

module.exports = BaseRepository;
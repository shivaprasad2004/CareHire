const BaseRepository = require('./BaseRepository');
const { User } = require('../models');
const AppError = require('../utils/AppError');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return await this.model.findOne({
      where: { email }
    });
  }

  async findByIdWithRelations(id, includes = []) {
    return await this.model.findByPk(id, {
      attributes: { exclude: ['passwordHash'] },
      include: includes
    });
  }

  async createUser(userData) {
    return await this.model.create(userData);
  }

  async updateProfile(userId, updateData, allowedFields = []) {
    const user = await this.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const filteredData = this.filterAllowedFields(updateData, allowedFields);
    
    Object.keys(filteredData).forEach(field => {
      user[field] = filteredData[field];
    });

    await user.save();
    
    const userResponse = user.toJSON();
    delete userResponse.passwordHash;
    
    return userResponse;
  }

  filterAllowedFields(data, allowedFields) {
    const filtered = {};
    allowedFields.forEach(field => {
      if (data[field] !== undefined) {
        filtered[field] = data[field];
      }
    });
    return filtered;
  }

  async findAllWithPagination(pagination = {}, attributes = { exclude: ['passwordHash'] }) {
    const { limit = 10, offset = 0 } = pagination;
    
    return await this.findAndCountAll({
      attributes,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
  }
}

module.exports = new UserRepository();
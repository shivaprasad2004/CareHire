const { User } = require('../models');
const AppError = require('../utils/AppError');

class UserService {
  async getAllUsers() {
    return await User.findAll({
      attributes: { exclude: ['passwordHash'] }
    });
  }

  async getUserById(id) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['passwordHash'] }
    });
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  async updateProfile(userId, updateData) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Filter allowed fields
    const allowedFields = ['firstName', 'lastName', 'title', 'specialty', 'organization', 'education', 'experience', 'skills', 'bio', 'avatarUrl', 'coverUrl', 'location', 'phone', 'website'];
    allowedFields.forEach(field => {
      if (updateData[field] !== undefined) {
        user[field] = updateData[field];
      }
    });

    await user.save();
    
    // Return user without password
    const userResponse = user.toJSON();
    delete userResponse.passwordHash;
    
    return userResponse;
  }
}

module.exports = new UserService();

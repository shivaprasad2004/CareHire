const BaseService = require('./BaseService');
const userRepository = require('../repositories/UserRepository');
const AppError = require('../utils/AppError');
const bcrypt = require('bcryptjs');

class UserService extends BaseService {
  constructor() {
    super(userRepository);
    this.allowedProfileFields = [
      'firstName', 'lastName', 'title', 'specialty', 'organization', 
      'education', 'experience', 'skills', 'bio', 'avatarUrl', 
      'coverUrl', 'location', 'phone', 'website'
    ];
  }

  async getUserById(id) {
    const user = await this.repository.findById(id, {
      attributes: { exclude: ['passwordHash'] }
    });
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    return this.formatUserResponse(user);
  }

  async getAllUsers(pagination = {}) {
    const result = await this.repository.findAllWithPagination(pagination);
    
    return {
      users: result.rows.map(user => this.formatUserResponse(user)),
      total: result.count,
      totalPages: Math.ceil(result.count / (pagination.limit || 10)),
      currentPage: pagination.page || 1
    };
  }

  async updateUserProfile(userId, updateData) {
    this.validateProfileData(updateData);
    
    const sanitizedData = this.sanitizeData(updateData, this.allowedProfileFields);
    
    const updatedUser = await this.repository.updateProfile(userId, sanitizedData, this.allowedProfileFields);
    
    return this.formatUserResponse(updatedUser);
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await this.repository.findById(userId);
    
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isPasswordValid) {
      throw new AppError('Current password is incorrect', 401);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    await this.repository.update(userId, { passwordHash: hashedPassword });
    
    return { message: 'Password updated successfully' };
  }

  validateProfileData(data) {
    if (data.phone && !this.isValidPhone(data.phone)) {
      throw new AppError('Invalid phone number format', 400);
    }
    
    if (data.website && !this.isValidUrl(data.website)) {
      throw new AppError('Invalid website URL format', 400);
    }
    
    if (data.skills && typeof data.skills === 'string') {
      try {
        JSON.parse(data.skills);
      } catch (e) {
        throw new AppError('Invalid skills JSON format', 400);
      }
    }
    
    if (data.experience && typeof data.experience === 'string') {
      try {
        JSON.parse(data.experience);
      } catch (e) {
        throw new AppError('Invalid experience JSON format', 400);
      }
    }
    
    if (data.education && typeof data.education === 'string') {
      try {
        JSON.parse(data.education);
      } catch (e) {
        throw new AppError('Invalid education JSON format', 400);
      }
    }
  }

  formatUserResponse(user) {
    const userObj = user.toJSON ? user.toJSON() : user;
    delete userObj.passwordHash;
    
    return {
      ...userObj,
      skills: this.safeParseJson(userObj.skills),
      experience: this.safeParseJson(userObj.experience),
      education: this.safeParseJson(userObj.education)
    };
  }

  safeParseJson(jsonString) {
    if (!jsonString) return null;
    try {
      return typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
    } catch (e) {
      return null;
    }
  }

  isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone);
  }

  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = new UserService();
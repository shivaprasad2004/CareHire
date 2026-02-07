const BaseController = require('./BaseController');
const userService = require('../services/userService');
const AppError = require('../utils/AppError');

class UserController extends BaseController {
  constructor() {
    super(userService);
    
    // Bind methods to maintain context
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  async getAllUsers(req, res, next) {
    return this.handleServiceCall(async () => {
      const pagination = this.extractPagination(req);
      return await this.service.getAllUsers(pagination);
    }, req, res, next);
  }

  async getUserById(req, res, next) {
    return this.handleServiceCall(async () => {
      const { id } = req.params;
      return await this.service.getUserById(id);
    }, req, res, next);
  }

  async getCurrentUser(req, res, next) {
    return this.handleServiceCall(async () => {
      const userId = this.extractUserId(req);
      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }
      return await this.service.getUserById(userId);
    }, req, res, next);
  }

  async updateProfile(req, res, next) {
    return this.handleServiceCall(async () => {
      const userId = this.extractUserId(req);
      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }
      
      return await this.service.updateUserProfile(userId, req.body);
    }, req, res, next);
  }

  async changePassword(req, res, next) {
    return this.handleServiceCall(async () => {
      const userId = this.extractUserId(req);
      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }
      
      this.validateRequiredBody(req, ['currentPassword', 'newPassword']);
      
      const { currentPassword, newPassword } = req.body;
      return await this.service.changePassword(userId, currentPassword, newPassword);
    }, req, res, next);
  }
}

module.exports = new UserController();
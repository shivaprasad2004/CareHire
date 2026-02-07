const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const AppError = require('../utils/AppError');

class AuthService {
  async register(userData) {
    const existingUser = await User.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(userData.password, salt);

    // Remove passwordConfirm if present to prevent Sequelize errors
    const { passwordConfirm, ...dataToSave } = userData;

    const newUser = await User.create({
      ...dataToSave,
      passwordHash
    });

    const token = this.generateToken(newUser.id, newUser.role);
    
    // Exclude password from response
    const userResponse = newUser.toJSON();
    delete userResponse.passwordHash;

    return { user: userResponse, token };
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = this.generateToken(user.id, user.role);

    const userResponse = user.toJSON();
    delete userResponse.passwordHash;

    return { user: userResponse, token };
  }

  async getProfile(userId) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['passwordHash'] }
    });
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  generateToken(id, role) {
    const secret = process.env.JWT_SECRET || 'carehire_production_fallback_secret_2024_secure_enough_for_now';
    if (!process.env.JWT_SECRET) {
       console.warn('AUTH SECURITY WARNING: Using fallback JWT_SECRET.');
    }
    return jwt.sign({ id, role }, secret, {
      expiresIn: '7d'
    });
  }
}

module.exports = new AuthService();
const Joi = require('joi');

const updateProfileSchema = Joi.object({
  firstName: Joi.string().min(1).max(50).optional(),
  lastName: Joi.string().min(1).max(50).optional(),
  title: Joi.string().max(100).optional(),
  specialty: Joi.string().max(100).optional(),
  organization: Joi.string().max(200).optional(),
  education: Joi.string().max(1000).optional(),
  experience: Joi.string().max(2000).optional(),
  skills: Joi.string().max(1000).optional(),
  bio: Joi.string().max(1000).optional(),
  avatarUrl: Joi.string().uri().optional(),
  coverUrl: Joi.string().uri().optional(),
  location: Joi.string().max(100).optional(),
  phone: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).optional(),
  website: Joi.string().uri().optional()
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().min(6).required(),
  newPassword: Joi.string().min(8).required()
});

module.exports = {
  updateProfileSchema,
  changePasswordSchema
};
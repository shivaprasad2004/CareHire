const Joi = require('joi');

const createOrganizationSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(2000).optional(),
  industry: Joi.string().max(100).optional(),
  location: Joi.string().max(200).optional(),
  website: Joi.string().uri().optional().allow(''),
  size: Joi.string().valid('1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+').optional(),
  founded: Joi.string().max(4).optional(),
  specialties: Joi.array().items(Joi.string()).optional(),
  type: Joi.string().valid('hospital', 'clinic', 'university', 'pharma', 'research', 'ngo', 'other').optional(),
  email: Joi.string().email().optional().allow(''),
  phone: Joi.string().max(20).optional().allow(''),
  tagline: Joi.string().max(200).optional(),
  logo: Joi.string().optional().allow(''),
  coverImage: Joi.string().optional().allow('')
});

const updateOrganizationSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  description: Joi.string().max(2000).optional(),
  industry: Joi.string().max(100).optional(),
  location: Joi.string().max(200).optional(),
  website: Joi.string().uri().optional().allow(''),
  size: Joi.string().valid('1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+').optional(),
  founded: Joi.string().max(4).optional(),
  specialties: Joi.array().items(Joi.string()).optional(),
  type: Joi.string().valid('hospital', 'clinic', 'university', 'pharma', 'research', 'ngo', 'other').optional(),
  email: Joi.string().email().optional().allow(''),
  phone: Joi.string().max(20).optional().allow(''),
  tagline: Joi.string().max(200).optional(),
  logo: Joi.string().optional().allow(''),
  coverImage: Joi.string().optional().allow('')
});

module.exports = { createOrganizationSchema, updateOrganizationSchema };

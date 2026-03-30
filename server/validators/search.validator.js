const Joi = require('joi');

const searchSchema = Joi.object({
  q: Joi.string().min(1).max(200).required(),
  type: Joi.string().valid('all', 'users', 'jobs', 'organizations', 'posts').optional(),
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(50).optional()
});

module.exports = { searchSchema };

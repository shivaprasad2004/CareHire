const Joi = require('joi');

const createPostSchema = Joi.object({
  content: Joi.string().min(1).max(5000).required(),
  type: Joi.string().valid('general', 'urgent', 'smart_round').default('general'),
  mediaUrl: Joi.string().uri().optional(),
  mediaType: Joi.string().valid('image', 'video', 'document').optional()
});

const updatePostSchema = Joi.object({
  content: Joi.string().min(1).max(5000).optional(),
  type: Joi.string().valid('general', 'urgent', 'smart_round').optional(),
  mediaUrl: Joi.string().uri().optional(),
  mediaType: Joi.string().valid('image', 'video', 'document').optional()
});

module.exports = {
  createPostSchema,
  updatePostSchema
};
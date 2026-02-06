const Joi = require('joi');

const createPostSchema = Joi.object({
  content: Joi.string().required(),
  mediaUrl: Joi.string().uri().optional().allow(null, '')
});

module.exports = {
  createPostSchema
};

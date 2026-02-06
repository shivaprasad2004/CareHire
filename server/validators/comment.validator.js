const Joi = require('joi');

const createCommentSchema = Joi.object({
  content: Joi.string().required()
});

module.exports = {
  createCommentSchema
};

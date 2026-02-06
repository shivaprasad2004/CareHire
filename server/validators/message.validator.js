const Joi = require('joi');

const sendMessageSchema = Joi.object({
  conversationId: Joi.string().guid({ version: 'uuidv4' }).required(),
  content: Joi.string().required()
});

module.exports = {
  sendMessageSchema
};

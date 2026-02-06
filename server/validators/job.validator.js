const Joi = require('joi');

const createJobSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  requirements: Joi.array().items(Joi.string()).optional(),
  type: Joi.string().valid('Full-time', 'Part-time', 'Locum', 'Internship').default('Full-time'),
  location: Joi.string().required(),
  salaryRange: Joi.string().optional()
});

module.exports = {
  createJobSchema
};

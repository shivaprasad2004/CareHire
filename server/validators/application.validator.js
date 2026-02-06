const Joi = require('joi');

const applySchema = Joi.object({
  jobId: Joi.string().guid({ version: 'uuidv4' }).required(),
  resumeUrl: Joi.string().uri().optional().allow(null, ''),
  coverLetter: Joi.string().optional().allow(null, '')
});

const updateStatusSchema = Joi.object({
  status: Joi.string().valid('Pending', 'Reviewed', 'Interview', 'Offer', 'Rejected').required()
});

module.exports = {
  applySchema,
  updateStatusSchema
};

const { Job, User } = require('../models');
const AppError = require('../utils/AppError');

class JobService {
  async createJob(jobData, recruiterId) {
    const job = await Job.create({
      ...jobData,
      recruiterId
    });
    return job;
  }

  async getJobs(filters = {}, pagination = { limit: 10, offset: 0 }) {
    const { limit, offset } = pagination;
    const where = {};

    if (filters.type) where.type = filters.type;
    if (filters.location) where.location = filters.location;
    // Add more filters as needed

    const jobs = await Job.findAndCountAll({
      where,
      limit,
      offset,
      include: [
        {
          model: User,
          as: 'recruiter',
          attributes: ['id', 'firstName', 'lastName', 'organization', 'avatarUrl']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    return jobs;
  }

  async getJobById(id) {
    const job = await Job.findByPk(id, {
      include: [
        {
          model: User,
          as: 'recruiter',
          attributes: ['id', 'firstName', 'lastName', 'organization', 'avatarUrl']
        }
      ]
    });

    if (!job) {
      throw new AppError('Job not found', 404);
    }

    return job;
  }
}

module.exports = new JobService();
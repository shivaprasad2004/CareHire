const { Application, Job, User } = require('../models');
const AppError = require('../utils/AppError');
const notificationService = require('./notification.service');

class ApplicationService {
  async applyForJob(userId, jobId, applicationData) {
    const job = await Job.findByPk(jobId);
    if (!job) {
      throw new AppError('Job not found', 404);
    }
    
    // Check if already applied
    const existingApp = await Application.findOne({
        where: { applicantId: userId, jobId: jobId }
    });
    
    if (existingApp) {
        throw new AppError('You have already applied for this job', 400);
    }

    const application = await Application.create({
      applicantId: userId,
      jobId,
      ...applicationData,
      status: 'pending'
    });
    
    // Notify recruiter
    await notificationService.createNotification(
        job.recruiterId,
        'new_application',
        `New application for ${job.title}`,
        { applicationId: application.id, jobId: job.id }
    );

    return application;
  }

  async getJobApplications(jobId, recruiterId) {
    const job = await Job.findByPk(jobId);
    if (!job) throw new AppError('Job not found', 404);
    
    if (job.recruiterId !== recruiterId) {
        throw new AppError('Not authorized to view applications for this job', 403);
    }

    return await Application.findAll({
      where: { jobId },
      include: [
        { model: User, as: 'applicant', attributes: ['id', 'firstName', 'lastName', 'email', 'avatarUrl', 'education', 'bio'] }
      ]
    });
  }

  async getUserApplications(userId) {
    return await Application.findAll({
      where: { applicantId: userId },
      include: [
        { 
            model: Job, 
            as: 'job', 
            attributes: ['id', 'title', 'organization', 'location', 'type'],
            include: [{ model: User, as: 'recruiter', attributes: ['organization', 'avatarUrl'] }]
        }
      ]
    });
  }
  
  async updateStatus(applicationId, status, recruiterId) {
      const application = await Application.findByPk(applicationId, {
          include: [{ model: Job, as: 'job' }]
      });
      
      if (!application) throw new AppError('Application not found', 404);
      
      if (application.job.recruiterId !== recruiterId) {
          throw new AppError('Not authorized', 403);
      }
      
      await application.update({ status });
      
      // Notify applicant
      await notificationService.createNotification(
          application.applicantId,
          'application_update',
          `Your application for ${application.job.title} is now ${status}`,
          { applicationId: application.id, status }
      );
      
      return application;
  }
}

module.exports = new ApplicationService();

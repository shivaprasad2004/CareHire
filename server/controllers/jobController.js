const jobService = require('../services/job.service');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllJobs = catchAsync(async (req, res, next) => {
  const jobs = await jobService.getAllJobs(req.query);
  res.status(200).json({
    status: 'success',
    results: jobs.length,
    data: {
      jobs
    }
  });
});

exports.getJobById = catchAsync(async (req, res, next) => {
  const job = await jobService.getJobById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      job
    }
  });
});

exports.createJob = catchAsync(async (req, res, next) => {
  if (req.user.role !== 'recruiter' && req.user.role !== 'admin') {
    return next(new AppError('Access denied. Only recruiters can post jobs.', 403));
  }

  const job = await jobService.createJob(req.body, req.user.id);
  res.status(201).json({
    status: 'success',
    data: {
      job
    }
  });
});

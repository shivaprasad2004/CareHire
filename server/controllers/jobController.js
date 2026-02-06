const jobService = require('../services/job.service');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllJobs = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  const filters = {
    type: req.query.type,
    location: req.query.location
  };

  const { count, rows } = await jobService.getJobs(filters, { limit, offset });

  res.status(200).json({
    status: 'success',
    results: rows.length,
    total: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    data: {
      jobs: rows
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

const applicationService = require('../services/application.service');
const catchAsync = require('../utils/catchAsync');

exports.applyForJob = catchAsync(async (req, res, next) => {
  const { jobId } = req.body; // or params
  // Usually POST /api/applications with body { jobId, ... } or POST /api/jobs/:jobId/apply
  // Let's assume POST /api/applications with jobId in body is cleaner for top-level resource, 
  // but POST /api/jobs/:jobId/apply is more RESTful for action.
  // I'll support POST /api/applications with jobId in body for now as I am creating applicationRoutes.
  
  const application = await applicationService.applyForJob(req.user.id, jobId, req.body);
  
  res.status(201).json({
    status: 'success',
    data: { application }
  });
});

exports.getMyApplications = catchAsync(async (req, res, next) => {
    const applications = await applicationService.getUserApplications(req.user.id);
    res.status(200).json({
        status: 'success',
        data: { applications }
    });
});

exports.getJobApplications = catchAsync(async (req, res, next) => {
    const { jobId } = req.params;
    const applications = await applicationService.getJobApplications(jobId, req.user.id);
    res.status(200).json({
        status: 'success',
        data: { applications }
    });
});

exports.updateApplicationStatus = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    const application = await applicationService.updateStatus(id, status, req.user.id);
    res.status(200).json({
        status: 'success',
        data: { application }
    });
});

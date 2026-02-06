const resourceService = require('../services/resource.service');
const catchAsync = require('../utils/catchAsync');

exports.getResources = catchAsync(async (req, res, next) => {
  const resources = await resourceService.getResources(req.query);
  res.status(200).json({
    status: 'success',
    results: resources.length,
    data: { resources }
  });
});

exports.createResource = catchAsync(async (req, res, next) => {
  const resource = await resourceService.createResource(req.body, req.user.id);
  res.status(201).json({
    status: 'success',
    data: { resource }
  });
});

exports.incrementDownload = catchAsync(async (req, res, next) => {
  await resourceService.incrementDownload(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Download count incremented'
  });
});

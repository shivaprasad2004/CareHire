const connectionService = require('../services/connection.service');
const catchAsync = require('../utils/catchAsync');

exports.getConnections = catchAsync(async (req, res, next) => {
  const connections = await connectionService.getConnections(req.user.id);
  res.status(200).json({
    status: 'success',
    results: connections.length,
    data: { connections }
  });
});

exports.getPendingRequests = catchAsync(async (req, res, next) => {
  const requests = await connectionService.getPendingRequests(req.user.id);
  res.status(200).json({
    status: 'success',
    results: requests.length,
    data: { requests }
  });
});

exports.sendRequest = catchAsync(async (req, res, next) => {
  const connection = await connectionService.sendRequest(req.user.id, req.body.recipientId);
  res.status(201).json({
    status: 'success',
    data: { connection }
  });
});

exports.respondToRequest = catchAsync(async (req, res, next) => {
  const connection = await connectionService.respondToRequest(req.params.id, req.body.status, req.user.id);
  res.status(200).json({
    status: 'success',
    data: { connection }
  });
});

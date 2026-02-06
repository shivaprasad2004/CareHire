const roundService = require('../services/round.service');
const catchAsync = require('../utils/catchAsync');

exports.getMyRounds = catchAsync(async (req, res, next) => {
  const rounds = await roundService.getRounds(req.user.id);
  res.status(200).json({
    status: 'success',
    results: rounds.length,
    data: { rounds }
  });
});

exports.createRound = catchAsync(async (req, res, next) => {
  // Assuming the user creates a round for themselves or assigned to them
  // Or if it's an admin/system creating it. For simplicity, user creates for self.
  const round = await roundService.createRound(req.body, req.user.id);
  res.status(201).json({
    status: 'success',
    data: { round }
  });
});

exports.updateRoundStatus = catchAsync(async (req, res, next) => {
  const round = await roundService.updateRoundStatus(req.params.id, req.body.status);
  res.status(200).json({
    status: 'success',
    data: { round }
  });
});

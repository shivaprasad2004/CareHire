const endorsementService = require('../services/endorsement.service');
const catchAsync = require('../utils/catchAsync');

exports.endorseSkill = catchAsync(async (req, res) => {
  const result = await endorsementService.endorseSkill(req.params.id, req.user.id, req.body.skill);
  res.status(200).json({ status: 'success', data: result });
});

exports.getEndorsements = catchAsync(async (req, res) => {
  const endorsements = await endorsementService.getEndorsements(req.params.id);
  res.status(200).json({ status: 'success', data: { endorsements } });
});

exports.writeRecommendation = catchAsync(async (req, res) => {
  const recommendation = await endorsementService.writeRecommendation(req.params.id, req.user.id, req.body.content, req.body.relationship);
  res.status(201).json({ status: 'success', data: { recommendation } });
});

exports.getRecommendations = catchAsync(async (req, res) => {
  const recommendations = await endorsementService.getRecommendations(req.params.id);
  res.status(200).json({ status: 'success', data: recommendations });
});

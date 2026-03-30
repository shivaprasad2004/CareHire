const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const catchAsync = require('../utils/catchAsync');
const { User } = require('../models');

router.get('/', protect, catchAsync(async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'location', 'openToWork', 'openToHire', 'profileVisibility', 'emailNotifications', 'pushNotifications']
  });
  res.status(200).json({ status: 'success', data: { settings: user } });
}));

router.put('/', protect, catchAsync(async (req, res) => {
  const allowedFields = ['openToWork', 'openToHire', 'profileVisibility', 'emailNotifications', 'pushNotifications'];
  const updates = {};
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });
  await User.update(updates, { where: { id: req.user.id } });
  const user = await User.findByPk(req.user.id);
  res.status(200).json({ status: 'success', data: { settings: user } });
}));

module.exports = router;

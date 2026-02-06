const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { applySchema, updateStatusSchema } = require('../validators/application.validator');

router.use(protect);

router.post('/', validate(applySchema), applicationController.applyForJob);
router.get('/me', applicationController.getMyApplications);
router.get('/job/:jobId', restrictTo('recruiter', 'admin'), applicationController.getJobApplications);
router.patch('/:id/status', restrictTo('recruiter', 'admin'), validate(updateStatusSchema), applicationController.updateApplicationStatus);

module.exports = router;

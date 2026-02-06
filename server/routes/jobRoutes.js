const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { createJobSchema } = require('../validators/job.validator');

router.get('/', jobController.getAllJobs); // Publicly accessible
router.get('/:id', jobController.getJobById);
router.post('/', protect, restrictTo('recruiter', 'admin'), validate(createJobSchema), jobController.createJob);

module.exports = router;

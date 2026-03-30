const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { createOrganizationSchema, updateOrganizationSchema } = require('../validators/organization.validator');

router.get('/', protect, organizationController.getOrganizations);
router.post('/', protect, validate(createOrganizationSchema), organizationController.createOrganization);
router.get('/:slug', protect, organizationController.getOrganizationBySlug);
router.put('/:id', protect, validate(updateOrganizationSchema), organizationController.updateOrganization);
router.delete('/:id', protect, organizationController.deleteOrganization);
router.post('/:id/follow', protect, organizationController.toggleFollow);
router.get('/:id/members', protect, organizationController.getMembers);
router.post('/:id/members', protect, organizationController.addMember);
router.get('/:id/jobs', protect, organizationController.getOrganizationJobs);
router.get('/:id/posts', protect, organizationController.getOrganizationPosts);

module.exports = router;

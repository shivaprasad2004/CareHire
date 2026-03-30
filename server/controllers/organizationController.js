const organizationService = require('../services/organization.service');
const catchAsync = require('../utils/catchAsync');

exports.createOrganization = catchAsync(async (req, res) => {
  const org = await organizationService.createOrganization(req.body, req.user.id);
  res.status(201).json({ status: 'success', data: { organization: org } });
});

exports.getOrganizations = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const offset = (page - 1) * limit;
  const filters = { type: req.query.type, search: req.query.search };
  const { count, rows } = await organizationService.getOrganizations(filters, { limit, offset });
  res.status(200).json({ status: 'success', results: rows.length, total: count, totalPages: Math.ceil(count / limit), currentPage: page, data: { organizations: rows } });
});

exports.getOrganizationBySlug = catchAsync(async (req, res) => {
  const org = await organizationService.getOrganizationBySlug(req.params.slug);
  let isFollowing = false;
  if (req.user) {
    isFollowing = await organizationService.isFollowing(org.id, req.user.id);
  }
  res.status(200).json({ status: 'success', data: { organization: org, isFollowing } });
});

exports.updateOrganization = catchAsync(async (req, res) => {
  const org = await organizationService.updateOrganization(req.params.id, req.body, req.user.id);
  res.status(200).json({ status: 'success', data: { organization: org } });
});

exports.deleteOrganization = catchAsync(async (req, res) => {
  const result = await organizationService.deleteOrganization(req.params.id, req.user.id);
  res.status(200).json({ status: 'success', data: result });
});

exports.toggleFollow = catchAsync(async (req, res) => {
  const result = await organizationService.toggleFollow(req.params.id, req.user.id);
  res.status(200).json({ status: 'success', data: result });
});

exports.getMembers = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const offset = (page - 1) * limit;
  const { count, rows } = await organizationService.getMembers(req.params.id, { limit, offset });
  res.status(200).json({ status: 'success', results: rows.length, total: count, data: { members: rows } });
});

exports.addMember = catchAsync(async (req, res) => {
  const member = await organizationService.addMember(req.params.id, req.body, req.user.id);
  res.status(201).json({ status: 'success', data: { member } });
});

exports.getOrganizationJobs = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const offset = (page - 1) * limit;
  const { count, rows } = await organizationService.getOrganizationJobs(req.params.id, { limit, offset });
  res.status(200).json({ status: 'success', results: rows.length, total: count, data: { jobs: rows } });
});

exports.getOrganizationPosts = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const offset = (page - 1) * limit;
  const { count, rows } = await organizationService.getOrganizationPosts(req.params.id, { limit, offset });
  res.status(200).json({ status: 'success', results: rows.length, total: count, data: { posts: rows } });
});

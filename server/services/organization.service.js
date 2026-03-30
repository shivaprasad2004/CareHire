const { Organization, OrganizationMember, OrganizationFollower, User, Job, Post } = require('../models');
const { Op } = require('sequelize');
const AppError = require('../utils/AppError');

class OrganizationService {
  async createOrganization(data, userId) {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const existing = await Organization.findOne({ where: { slug } });
    if (existing) throw new AppError('An organization with a similar name already exists', 400);

    const org = await Organization.create({ ...data, slug, adminId: userId });
    await OrganizationMember.create({ organizationId: org.id, userId, role: 'admin', title: data.adminTitle || 'Administrator' });
    return org;
  }

  async getOrganizations(filters = {}, pagination = {}) {
    const where = {};
    if (filters.type) where.type = filters.type;
    if (filters.search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${filters.search}%` } },
        { description: { [Op.iLike]: `%${filters.search}%` } }
      ];
    }
    const { count, rows } = await Organization.findAndCountAll({
      where, limit: pagination.limit || 20, offset: pagination.offset || 0,
      order: [['createdAt', 'DESC']], include: [{ model: User, as: 'admin', attributes: ['id', 'firstName', 'lastName', 'avatarUrl'] }]
    });
    return { count, rows };
  }

  async getOrganizationBySlug(slug) {
    const org = await Organization.findOne({
      where: { slug },
      include: [{ model: User, as: 'admin', attributes: ['id', 'firstName', 'lastName', 'avatarUrl'] }]
    });
    if (!org) throw new AppError('Organization not found', 404);
    return org;
  }

  async updateOrganization(id, data, userId) {
    const org = await Organization.findByPk(id);
    if (!org) throw new AppError('Organization not found', 404);
    if (org.adminId !== userId) {
      const member = await OrganizationMember.findOne({ where: { organizationId: id, userId, role: 'admin' } });
      if (!member) throw new AppError('Not authorized to update this organization', 403);
    }
    await org.update(data);
    return org;
  }

  async deleteOrganization(id, userId) {
    const org = await Organization.findByPk(id);
    if (!org) throw new AppError('Organization not found', 404);
    if (org.adminId !== userId) throw new AppError('Only the owner can delete this organization', 403);
    await org.destroy();
    return { message: 'Organization deleted successfully' };
  }

  async toggleFollow(organizationId, userId) {
    const org = await Organization.findByPk(organizationId);
    if (!org) throw new AppError('Organization not found', 404);

    const existing = await OrganizationFollower.findOne({ where: { organizationId, userId } });
    if (existing) {
      await existing.destroy();
      await org.decrement('followersCount');
      return { following: false };
    }
    await OrganizationFollower.create({ organizationId, userId });
    await org.increment('followersCount');
    return { following: true };
  }

  async getMembers(organizationId, pagination = {}) {
    const { count, rows } = await OrganizationMember.findAndCountAll({
      where: { organizationId },
      limit: pagination.limit || 20, offset: pagination.offset || 0,
      include: [{ model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'avatarUrl', 'title', 'specialty'] }]
    });
    return { count, rows };
  }

  async addMember(organizationId, data, userId) {
    const org = await Organization.findByPk(organizationId);
    if (!org) throw new AppError('Organization not found', 404);
    const adminMember = await OrganizationMember.findOne({ where: { organizationId, userId, role: 'admin' } });
    if (!adminMember && org.adminId !== userId) throw new AppError('Not authorized', 403);

    const member = await OrganizationMember.create({ organizationId, userId: data.userId, role: data.role || 'member', title: data.title });
    await org.increment('employeesCount');
    return member;
  }

  async getOrganizationJobs(organizationId, pagination = {}) {
    const { count, rows } = await Job.findAndCountAll({
      where: { organizationId, status: 'Open' },
      limit: pagination.limit || 20, offset: pagination.offset || 0,
      order: [['createdAt', 'DESC']]
    });
    return { count, rows };
  }

  async getOrganizationPosts(organizationId, pagination = {}) {
    const { count, rows } = await Post.findAndCountAll({
      where: { organizationId },
      limit: pagination.limit || 20, offset: pagination.offset || 0,
      order: [['createdAt', 'DESC']],
      include: [{ model: User, as: 'author', attributes: ['id', 'firstName', 'lastName', 'avatarUrl'] }]
    });
    return { count, rows };
  }

  async isFollowing(organizationId, userId) {
    const follower = await OrganizationFollower.findOne({ where: { organizationId, userId } });
    return !!follower;
  }
}

module.exports = new OrganizationService();

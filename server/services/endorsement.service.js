const { Endorsement, Recommendation, User } = require('../models');
const AppError = require('../utils/AppError');

class EndorsementService {
  async endorseSkill(userId, endorserId, skill) {
    if (userId === endorserId) throw new AppError('You cannot endorse yourself', 400);
    const existing = await Endorsement.findOne({ where: { userId, endorserId, skill } });
    if (existing) {
      await existing.destroy();
      return { endorsed: false, message: 'Endorsement removed' };
    }
    await Endorsement.create({ userId, endorserId, skill });
    return { endorsed: true, message: 'Skill endorsed' };
  }

  async getEndorsements(userId) {
    const endorsements = await Endorsement.findAll({
      where: { userId },
      include: [{ model: User, as: 'endorser', attributes: ['id', 'firstName', 'lastName', 'avatarUrl', 'title'] }]
    });
    const grouped = {};
    endorsements.forEach(e => {
      if (!grouped[e.skill]) grouped[e.skill] = [];
      grouped[e.skill].push(e.endorser);
    });
    return grouped;
  }

  async writeRecommendation(recipientId, authorId, content, relationship) {
    if (recipientId === authorId) throw new AppError('You cannot recommend yourself', 400);
    const recommendation = await Recommendation.create({ recipientId, authorId, content, relationship });
    return recommendation;
  }

  async getRecommendations(userId) {
    const received = await Recommendation.findAll({
      where: { recipientId: userId, isVisible: true },
      include: [{ model: User, as: 'author', attributes: ['id', 'firstName', 'lastName', 'avatarUrl', 'title', 'specialty'] }],
      order: [['createdAt', 'DESC']]
    });
    const given = await Recommendation.findAll({
      where: { authorId: userId },
      include: [{ model: User, as: 'recipient', attributes: ['id', 'firstName', 'lastName', 'avatarUrl', 'title', 'specialty'] }],
      order: [['createdAt', 'DESC']]
    });
    return { received, given };
  }
}

module.exports = new EndorsementService();

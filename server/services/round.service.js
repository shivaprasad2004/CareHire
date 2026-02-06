const { Round, User } = require('../models');
const AppError = require('../utils/AppError');

class RoundService {
  async getRounds(userId, query) {
    // Assuming we want to fetch rounds assigned to the user
    // Or if the user is a doctor/admin, maybe all rounds
    // For now, let's just fetch rounds assigned to the user
    const rounds = await Round.findAll({
      where: { assignedToId: userId },
      order: [['createdAt', 'DESC']]
    });
    return rounds;
  }

  async createRound(roundData, assignedToId) {
    return await Round.create({
      ...roundData,
      assignedToId
    });
  }

  async updateRoundStatus(roundId, status) {
    const round = await Round.findByPk(roundId);
    if (!round) {
      throw new AppError('Round not found', 404);
    }
    round.status = status;
    await round.save();
    return round;
  }
}

module.exports = new RoundService();

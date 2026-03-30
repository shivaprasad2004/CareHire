import BaseService from './BaseService';

class EndorsementService extends BaseService {
  constructor() {
    super('/users');
  }

  async endorseSkill(userId, skill) {
    return this.post(`/${userId}/endorse`, { skill });
  }

  async getEndorsements(userId) {
    return this.get(`/${userId}/endorsements`);
  }

  async writeRecommendation(userId, data) {
    return this.post(`/${userId}/recommend`, data);
  }

  async getRecommendations(userId) {
    return this.get(`/${userId}/recommendations`);
  }
}

export const endorsementService = new EndorsementService();

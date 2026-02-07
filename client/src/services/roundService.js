import BaseService from './BaseService';

class RoundService extends BaseService {
  constructor() {
    super('/rounds');
  }

  async getAllRounds() {
    return this.get('/');
  }

  async createRound(data) {
    return this.post('/', data);
  }
}

export const roundService = new RoundService();

import BaseService from './BaseService';

class SavedJobService extends BaseService {
  constructor() {
    super('/jobs');
  }

  async saveJob(jobId) {
    return this.post(`/${jobId}/save`);
  }

  async getSavedJobs() {
    return this.get('/saved');
  }
}

export const savedJobService = new SavedJobService();

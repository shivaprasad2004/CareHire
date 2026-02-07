import BaseService from './BaseService';

class JobService extends BaseService {
  constructor() {
    super('/jobs');
  }

  async getAllJobs(filters = {}) {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.location) params.append('location', filters.location);
    if (filters.type) params.append('type', filters.type);
    
    const queryString = params.toString();
    return this.get(queryString ? `?${queryString}` : '/');
  }

  async getJobById(id) {
    return this.get(`/${id}`);
  }

  async applyForJob(id, data) {
    return this.post(`/${id}/apply`, data);
  }
}

export const jobService = new JobService();

import BaseService from './BaseService';

class ApplicationService extends BaseService {
  constructor() {
    super('/applications');
  }

  async applyForJob(data) {
    return this.post('', data);
  }

  async getMyApplications() {
    return this.get('/me');
  }

  async getJobApplications(jobId) {
    return this.get(`/job/${jobId}`);
  }

  async updateApplicationStatus(id, status) {
    return this.patch(`/${id}/status`, { status });
  }
}

export const applicationService = new ApplicationService();

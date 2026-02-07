import BaseService from './BaseService';

class ResourceService extends BaseService {
  constructor() {
    super('/resources');
  }

  async getAllResources(filters = {}) {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'All') params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);
    
    const queryString = params.toString();
    return this.get(queryString ? `?${queryString}` : '/');
  }

  async getResourceById(id) {
    return this.get(`/${id}`);
  }

  async downloadResource(id) {
    return this.post(`/${id}/download`);
  }
}

export const resourceService = new ResourceService();

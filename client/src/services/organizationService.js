import BaseService from './BaseService';

class OrganizationService extends BaseService {
  constructor() {
    super('/organizations');
  }

  async getOrganizations(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.get(`?${query}`);
  }

  async getOrganizationBySlug(slug) {
    return this.get(`/${slug}`);
  }

  async createOrganization(data) {
    return this.post('', data);
  }

  async updateOrganization(id, data) {
    return this.put(`/${id}`, data);
  }

  async deleteOrganization(id) {
    return this.delete(`/${id}`);
  }

  async toggleFollow(id) {
    return this.post(`/${id}/follow`);
  }

  async getMembers(id, params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.get(`/${id}/members?${query}`);
  }

  async addMember(id, data) {
    return this.post(`/${id}/members`, data);
  }

  async getOrganizationJobs(id, params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.get(`/${id}/jobs?${query}`);
  }

  async getOrganizationPosts(id, params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.get(`/${id}/posts?${query}`);
  }
}

export const organizationService = new OrganizationService();

import BaseService from './BaseService';

class SearchService extends BaseService {
  constructor() {
    super('/search');
  }

  async search(query, type = 'all', page = 1, limit = 10) {
    return this.get(`?q=${encodeURIComponent(query)}&type=${type}&page=${page}&limit=${limit}`);
  }

  async getSuggestions(query) {
    return this.get(`/suggestions?q=${encodeURIComponent(query)}`);
  }

  async getSearchHistory() {
    return this.get('/history');
  }

  async clearSearchHistory() {
    return this.delete('/history');
  }
}

export const searchService = new SearchService();

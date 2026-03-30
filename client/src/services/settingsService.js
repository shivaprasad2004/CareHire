import BaseService from './BaseService';

class SettingsService extends BaseService {
  constructor() {
    super('/settings');
  }

  async getSettings() {
    return this.get('');
  }

  async updateSettings(data) {
    return this.put('', data);
  }
}

export const settingsService = new SettingsService();

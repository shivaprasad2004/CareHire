import BaseService from './BaseService';

class UploadService extends BaseService {
  constructor() {
    super('/upload');
  }

  async uploadImage(formData) {
    return this.upload('/', formData);
  }
}

export const uploadService = new UploadService();

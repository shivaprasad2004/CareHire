class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async findAll(options = {}) {
    return await this.repository.findAll(options);
  }

  async findById(id, options = {}) {
    return await this.repository.findById(id, options);
  }

  async create(data, options = {}) {
    return await this.repository.create(data, options);
  }

  async update(id, data, options = {}) {
    return await this.repository.update(id, data, options);
  }

  async delete(id, options = {}) {
    return await this.repository.delete(id, options);
  }

  async exists(id) {
    return await this.repository.exists(id);
  }

  validateRequiredFields(data, requiredFields) {
    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
  }

  sanitizeData(data, allowedFields) {
    const sanitized = {};
    allowedFields.forEach(field => {
      if (data[field] !== undefined) {
        sanitized[field] = data[field];
      }
    });
    return sanitized;
  }
}

module.exports = BaseService;
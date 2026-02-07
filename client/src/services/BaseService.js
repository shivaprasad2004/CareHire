import { getApiUrl } from '../config/api';

class BaseService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async request(path, options = {}) {
    const url = getApiUrl(`${this.endpoint}${path}`);
    const token = localStorage.getItem('token');
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      }
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
      error.status = response.status;
      
      try {
        const errorData = await response.json();
        error.message = errorData.message || error.message;
      } catch (e) {
        // Keep default error message if JSON parsing fails
      }
      
      throw error;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  }

  async get(path = '', options = {}) {
    return this.request(path, { ...options, method: 'GET' });
  }

  async post(path = '', data, options = {}) {
    return this.request(path, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async put(path = '', data, options = {}) {
    return this.request(path, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async patch(path = '', data, options = {}) {
    return this.request(path, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async delete(path = '', options = {}) {
    return this.request(path, { ...options, method: 'DELETE' });
  }

  async upload(path = '', formData, options = {}) {
    const url = getApiUrl(`${this.endpoint}${path}`);
    const token = localStorage.getItem('token');
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: formData,
      ...options
    });

    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
      error.status = response.status;
      throw error;
    }

    return await response.json();
  }
}

export default BaseService;
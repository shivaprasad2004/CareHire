import BaseService from './BaseService';

class UserService extends BaseService {
  constructor() {
    super('/users');
  }

  async getAllUsers(pagination = {}) {
    const params = new URLSearchParams();
    if (pagination.page) params.append('page', pagination.page);
    if (pagination.limit) params.append('limit', pagination.limit);
    
    return this.get(`?${params}`);
  }

  async getUserById(id) {
    return this.get(`/${id}`);
  }

  async getCurrentUser() {
    return this.get('/me');
  }

  async updateProfile(profileData) {
    return this.put('/profile', profileData);
  }

  async changePassword(passwordData) {
    return this.put('/change-password', passwordData);
  }

  async uploadAvatar(formData) {
    return this.upload('/upload/avatar', formData);
  }

  async uploadCover(formData) {
    return this.upload('/upload/cover', formData);
  }

  formatUserData(user) {
    return {
      ...user,
      displayName: `${user.firstName} ${user.lastName}`,
      hasAvatar: !!user.avatarUrl,
      hasCover: !!user.coverUrl,
      skills: this.safeParseJson(user.skills) || [],
      experience: this.safeParseJson(user.experience) || [],
      education: this.safeParseJson(user.education) || []
    };
  }

  safeParseJson(jsonString) {
    if (!jsonString) return null;
    try {
      return typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
    } catch (e) {
      console.warn('Failed to parse JSON:', jsonString);
      return null;
    }
  }

  validateProfileData(data) {
    const errors = {};
    
    if (data.phone && !this.isValidPhone(data.phone)) {
      errors.phone = 'Invalid phone number format';
    }
    
    if (data.website && !this.isValidUrl(data.website)) {
      errors.website = 'Invalid website URL format';
    }
    
    if (data.skills && typeof data.skills === 'string') {
      try {
        JSON.parse(data.skills);
      } catch (e) {
        errors.skills = 'Invalid skills JSON format';
      }
    }
    
    if (data.experience && typeof data.experience === 'string') {
      try {
        JSON.parse(data.experience);
      } catch (e) {
        errors.experience = 'Invalid experience JSON format';
      }
    }
    
    if (data.education && typeof data.education === 'string') {
      try {
        JSON.parse(data.education);
      } catch (e) {
        errors.education = 'Invalid education JSON format';
      }
    }
    
    return Object.keys(errors).length > 0 ? errors : null;
  }

  isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone);
  }

  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default new UserService();
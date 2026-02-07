import { getApiUrl } from '../config/api';

export const userService = {
  updateProfile: async (userData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(getApiUrl('users/profile'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const data = await response.json();
      return data.data.user;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  uploadImage: async (file) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(getApiUrl('upload'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to upload image');
      }

      const data = await response.json();
      return data.data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
};

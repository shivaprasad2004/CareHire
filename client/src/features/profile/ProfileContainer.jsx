import React, { useState, useCallback } from 'react';
import userService from '../../services/UserService';
import withAuth from '../../hoc/withAuth.jsx';
import withLoading from '../../hoc/withLoading.jsx';
import Profile from './Profile';

const ProfileContainer = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = useCallback((updatedUser) => {
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }, []);

  const handleSaveProfile = useCallback(async (updatedData) => {
    try {
      setLoading(true);
      setError(null);
      const newUser = await userService.updateProfile(updatedData);
      updateUser(newUser);
      setIsEditing(false);
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [updateUser]);

  const handleEditStart = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <Profile
      user={user}
      isEditing={isEditing}
      loading={loading}
      error={error}
      onSaveProfile={handleSaveProfile}
      onEditStart={handleEditStart}
      onEditCancel={handleEditCancel}
    />
  );
};

export default withAuth(
  withLoading(ProfileContainer, {
    loadingDelay: 200,
    loadingMessage: 'Loading profile...',
    errorMessage: 'Failed to load profile'
  })
);
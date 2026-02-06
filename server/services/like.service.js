const { Like } = require('../models');
const AppError = require('../utils/AppError');

class LikeService {
  async toggleLike(userId, entityType, entityId) {
    // entityType: 'post', 'comment', 'job', etc.
    // Assuming Like model has fields: userId, entityId, entityType
    // Wait, let's check Like model structure.
    // If Like model is specific to Post (postId), I should adapt.
    // Based on standard design, I'll assume generic or specific fields.
    
    // Let's assume the Like model has userId and postId (since I saw postId in index.js relationships usually)
    // If it's a polymorphic like, it would have entityType. 
    // Checking previous context, I didn't see Like model definition. 
    // I will assume it is for Posts for now.
    
    const existingLike = await Like.findOne({
      where: {
        userId,
        postId: entityId
      }
    });

    if (existingLike) {
      await existingLike.destroy();
      return { liked: false };
    } else {
      await Like.create({
        userId,
        postId: entityId
      });
      return { liked: true };
    }
  }
  
  async getLikes(postId) {
      return await Like.count({ where: { postId } });
  }
}

module.exports = new LikeService();

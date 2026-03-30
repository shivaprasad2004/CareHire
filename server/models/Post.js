const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  authorId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  mediaUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('Regular', 'SmartRound', 'UrgentCase'),
    defaultValue: 'Regular'
  },
  likesCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  commentsCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  sharesCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  // Enhanced fields
  mediaUrls: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  mediaType: {
    type: DataTypes.ENUM('none', 'image', 'video', 'document', 'poll'),
    defaultValue: 'none'
  },
  pollOptions: {
    type: DataTypes.JSON, // [{text, votes: 0}]
    allowNull: true
  },
  pollExpiresAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  organizationId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  sharedPostId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  visibility: {
    type: DataTypes.ENUM('public', 'connections', 'private'),
    defaultValue: 'public'
  },
  reactionsCount: {
    type: DataTypes.JSON,
    defaultValue: { like: 0, celebrate: 0, support: 0, insightful: 0, curious: 0 }
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['authorId'] },
    { fields: ['type'] },
    { fields: ['organizationId'] }
  ]
});

module.exports = Post;
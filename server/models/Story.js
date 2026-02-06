const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Story = sequelize.define('Story', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING, // Could be text or image URL
    allowNull: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  urgency: {
    type: DataTypes.ENUM('normal', 'high', 'critical'),
    defaultValue: 'normal'
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['userId'] },
    { fields: ['expiresAt'] } // Useful for cleaning up old stories
  ]
});

module.exports = Story;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Like = sequelize.define('Like', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['postId'] },
    { fields: ['userId'] },
    { fields: ['postId', 'userId'], unique: true }
  ]
});

module.exports = Like;
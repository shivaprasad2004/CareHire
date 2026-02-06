const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  authorId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['postId'] },
    { fields: ['authorId'] }
  ]
});

module.exports = Comment;
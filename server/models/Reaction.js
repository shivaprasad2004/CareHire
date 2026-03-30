const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Reaction = sequelize.define('Reaction', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  postId: { type: DataTypes.UUID, allowNull: false },
  userId: { type: DataTypes.UUID, allowNull: false },
  type: { type: DataTypes.ENUM('like', 'celebrate', 'support', 'insightful', 'curious'), defaultValue: 'like' }
}, { timestamps: true, indexes: [{ unique: true, fields: ['postId', 'userId'] }, { fields: ['postId'] }] });
module.exports = Reaction;

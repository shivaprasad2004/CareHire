const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const SearchHistory = sequelize.define('SearchHistory', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  query: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.ENUM('user', 'job', 'organization', 'post'), allowNull: true },
  resultId: { type: DataTypes.UUID, allowNull: true }
}, { timestamps: true, indexes: [{ fields: ['userId'] }] });
module.exports = SearchHistory;

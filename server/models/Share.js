const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Share = sequelize.define('Share', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  originalPostId: { type: DataTypes.UUID, allowNull: false },
  userId: { type: DataTypes.UUID, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: true }
}, { timestamps: true, indexes: [{ fields: ['originalPostId'] }, { fields: ['userId'] }] });
module.exports = Share;

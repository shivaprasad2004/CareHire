const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Recommendation = sequelize.define('Recommendation', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  recipientId: { type: DataTypes.UUID, allowNull: false },
  authorId: { type: DataTypes.UUID, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  relationship: { type: DataTypes.STRING, allowNull: true },
  isVisible: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { timestamps: true, indexes: [{ fields: ['recipientId'] }, { fields: ['authorId'] }] });
module.exports = Recommendation;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Endorsement = sequelize.define('Endorsement', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  endorserId: { type: DataTypes.UUID, allowNull: false },
  skill: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: true, indexes: [{ unique: true, fields: ['userId', 'endorserId', 'skill'] }, { fields: ['userId'] }] });
module.exports = Endorsement;

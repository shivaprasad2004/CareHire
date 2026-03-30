const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const OrganizationFollower = sequelize.define('OrganizationFollower', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  organizationId: { type: DataTypes.UUID, allowNull: false },
  userId: { type: DataTypes.UUID, allowNull: false }
}, { timestamps: true, indexes: [{ unique: true, fields: ['organizationId', 'userId'] }] });
module.exports = OrganizationFollower;

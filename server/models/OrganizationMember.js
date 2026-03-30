const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const OrganizationMember = sequelize.define('OrganizationMember', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  organizationId: { type: DataTypes.UUID, allowNull: false },
  userId: { type: DataTypes.UUID, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'editor', 'member'), defaultValue: 'member' },
  title: { type: DataTypes.STRING, allowNull: true },
  startDate: { type: DataTypes.DATEONLY, allowNull: true },
  endDate: { type: DataTypes.DATEONLY, allowNull: true }
}, { timestamps: true, indexes: [{ unique: true, fields: ['organizationId', 'userId'] }] });
module.exports = OrganizationMember;

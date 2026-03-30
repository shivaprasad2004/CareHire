const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Organization = sequelize.define('Organization', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  logo: { type: DataTypes.STRING, allowNull: true },
  coverImage: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.TEXT, allowNull: true },
  industry: { type: DataTypes.STRING, allowNull: true },
  location: { type: DataTypes.STRING, allowNull: true },
  website: { type: DataTypes.STRING, allowNull: true },
  size: { type: DataTypes.ENUM('1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+'), allowNull: true },
  founded: { type: DataTypes.STRING, allowNull: true },
  specialties: { type: DataTypes.JSON, defaultValue: [] },
  type: { type: DataTypes.ENUM('hospital', 'clinic', 'university', 'pharma', 'research', 'ngo', 'other'), defaultValue: 'hospital' },
  adminId: { type: DataTypes.UUID, allowNull: false },
  verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  followersCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  employeesCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  email: { type: DataTypes.STRING, allowNull: true },
  phone: { type: DataTypes.STRING, allowNull: true },
  tagline: { type: DataTypes.STRING, allowNull: true }
}, { timestamps: true, indexes: [{ fields: ['slug'] }, { fields: ['adminId'] }, { fields: ['type'] }] });
module.exports = Organization;

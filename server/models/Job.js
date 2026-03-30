const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  recruiterId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  requirements: {
    type: DataTypes.JSON, // Stores array of strings
    allowNull: true,
    defaultValue: []
  },
  type: {
    type: DataTypes.ENUM('Full-time', 'Part-time', 'Locum', 'Internship'),
    defaultValue: 'Full-time'
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salaryRange: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Open', 'Closed', 'Filled'),
    defaultValue: 'Open'
  },
  // Enhanced fields
  organizationId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  experienceLevel: {
    type: DataTypes.ENUM('Entry', 'Mid', 'Senior', 'Director', 'Executive'),
    allowNull: true
  },
  workplaceType: {
    type: DataTypes.ENUM('On-site', 'Remote', 'Hybrid'),
    defaultValue: 'On-site'
  },
  applicantsCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  viewsCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  skills: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  benefits: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true
  },
  specialtyRequired: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['recruiterId'] },
    { fields: ['type'] },
    { fields: ['location'] },
    { fields: ['status'] },
    { fields: ['organizationId'] }
  ]
});

module.exports = Job;
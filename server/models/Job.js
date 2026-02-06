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
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['recruiterId'] },
    { fields: ['type'] },
    { fields: ['location'] },
    { fields: ['status'] }
  ]
});

module.exports = Job;
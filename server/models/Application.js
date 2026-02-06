const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'reviewed', 'interview', 'rejected', 'accepted'),
    defaultValue: 'pending'
  },
  resumeUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = Application;

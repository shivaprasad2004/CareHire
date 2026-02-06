const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  jobId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  applicantId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Reviewed', 'Interview', 'Offer', 'Rejected'),
    defaultValue: 'Pending'
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
  timestamps: true,
  indexes: [
    { fields: ['jobId'] },
    { fields: ['applicantId'] },
    { fields: ['status'] }
  ]
});

module.exports = Application;
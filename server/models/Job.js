const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hospital: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('Full-time', 'Part-time', 'Contract', 'Internship', 'Residency', 'Fellowship'),
    defaultValue: 'Full-time'
  },
  salaryRange: {
    type: DataTypes.STRING, // e.g., "$120k - $150k"
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  requirements: {
    type: DataTypes.JSON, // Store as JSON array ["MD", "3+ years exp"]
    allowNull: true
  },
  scope: {
    type: DataTypes.ENUM('urban', 'rural', 'international', 'remote'),
    defaultValue: 'urban'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true
});

module.exports = Job;

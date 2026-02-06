const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Resource = sequelize.define('Resource', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('protocol', 'guide', 'reference', 'article', 'video'),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING, // e.g., 'Cardiology', 'Pediatrics'
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  downloadCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  uploadedBy: {
    type: DataTypes.UUID,
    allowNull: true // Admin or user who uploaded it
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['category'] },
    { fields: ['type'] }
  ]
});

module.exports = Resource;

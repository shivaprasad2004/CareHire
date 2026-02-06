const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Round = sequelize.define('Round', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  type: {
    type: DataTypes.ENUM('urgent', 'lab', 'round', 'general'),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  patientName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  priority: {
    type: DataTypes.ENUM('low', 'normal', 'medium', 'high', 'critical'),
    defaultValue: 'normal'
  },
  status: {
    type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
    defaultValue: 'pending'
  },
  aiScore: {
    type: DataTypes.INTEGER,
    validate: { min: 0, max: 100 },
    allowNull: true
  },
  assignedToId: {
    type: DataTypes.UUID,
    allowNull: true
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['priority'] },
    { fields: ['status'] },
    { fields: ['assignedToId'] }
  ]
});

module.exports = Round;

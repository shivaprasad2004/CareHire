const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Connection = sequelize.define('Connection', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  requesterId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  recipientId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending'
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['requesterId'] },
    { fields: ['recipientId'] },
    { fields: ['requesterId', 'recipientId'], unique: true }
  ]
});

module.exports = Connection;

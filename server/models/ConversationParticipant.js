const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const ConversationParticipant = sequelize.define('ConversationParticipant', {
  conversationId: {
    type: DataTypes.UUID,
    references: {
      model: 'Conversations',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
}, {
  timestamps: false,
  indexes: [
    { fields: ['conversationId'] },
    { fields: ['userId'] }
  ]
});

module.exports = ConversationParticipant;
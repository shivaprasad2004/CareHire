const { Connection, User } = require('../models');
const { Op } = require('sequelize');
const AppError = require('../utils/AppError');

class ConnectionService {
  async getConnections(userId) {
    // Get accepted connections
    const connections = await Connection.findAll({
      where: {
        [Op.or]: [{ requesterId: userId }, { recipientId: userId }],
        status: 'accepted'
      },
      include: [
        { model: User, as: 'requester', attributes: ['id', 'firstName', 'lastName', 'role', 'specialty', 'organization', 'avatarUrl'] },
        { model: User, as: 'recipient', attributes: ['id', 'firstName', 'lastName', 'role', 'specialty', 'organization', 'avatarUrl'] }
      ]
    });

    // Transform to list of users
    return connections.map(conn => {
      if (conn.requesterId === userId) return conn.recipient;
      return conn.requester;
    });
  }

  async getPendingRequests(userId) {
    return await Connection.findAll({
      where: {
        recipientId: userId,
        status: 'pending'
      },
      include: [
        { model: User, as: 'requester', attributes: ['id', 'firstName', 'lastName', 'role', 'specialty', 'organization', 'avatarUrl'] }
      ]
    });
  }

  async sendRequest(requesterId, recipientId) {
    if (requesterId === recipientId) {
      throw new AppError('Cannot connect with yourself', 400);
    }

    const existing = await Connection.findOne({
      where: {
        [Op.or]: [
          { requesterId, recipientId },
          { requesterId: recipientId, recipientId: requesterId }
        ]
      }
    });

    if (existing) {
      if (existing.status === 'pending') throw new AppError('Connection request already pending', 400);
      if (existing.status === 'accepted') throw new AppError('Already connected', 400);
      // If rejected, maybe allow resending? For now, throw error.
      throw new AppError('Connection status: ' + existing.status, 400);
    }

    return await Connection.create({
      requesterId,
      recipientId,
      status: 'pending'
    });
  }

  async respondToRequest(connectionId, status, userId) {
    const connection = await Connection.findOne({
      where: {
        id: connectionId,
        recipientId: userId,
        status: 'pending'
      }
    });

    if (!connection) {
      throw new AppError('Connection request not found', 404);
    }

    if (!['accepted', 'rejected'].includes(status)) {
      throw new AppError('Invalid status', 400);
    }

    connection.status = status;
    await connection.save();
    return connection;
  }
}

module.exports = new ConnectionService();

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Hashtag = sequelize.define('Hashtag', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  postsCount: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { timestamps: true, indexes: [{ fields: ['name'] }] });
module.exports = Hashtag;

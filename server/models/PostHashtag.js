const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const PostHashtag = sequelize.define('PostHashtag', {
  postId: { type: DataTypes.UUID, allowNull: false },
  hashtagId: { type: DataTypes.UUID, allowNull: false }
}, { timestamps: false, indexes: [{ unique: true, fields: ['postId', 'hashtagId'] }] });
module.exports = PostHashtag;

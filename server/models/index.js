const Sequelize = require('sequelize');
const sequelize = require('../config/db.config');

const User = require('./User');
const Job = require('./Job');
const Application = require('./Application');
const Post = require('./Post');
const Comment = require('./Comment');
const Like = require('./Like');
const Conversation = require('./Conversation');
const Message = require('./Message');
const ConversationParticipant = require('./ConversationParticipant');
const Notification = require('./Notification');
const Round = require('./Round');
const Story = require('./Story');
const Connection = require('./Connection');
const Resource = require('./Resource');

// User Relationships
User.hasMany(Job, { foreignKey: 'recruiterId', as: 'jobs' });
User.hasMany(Application, { foreignKey: 'applicantId', as: 'applications' });
User.hasMany(Post, { foreignKey: 'authorId', as: 'posts' });
User.hasMany(Comment, { foreignKey: 'authorId', as: 'comments' });
User.hasMany(Like, { foreignKey: 'userId', as: 'likes' });
User.hasMany(Message, { foreignKey: 'senderId', as: 'messages' });
User.belongsToMany(Conversation, { through: ConversationParticipant, foreignKey: 'userId', as: 'conversations' });
User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
User.hasMany(Story, { foreignKey: 'userId', as: 'stories' });
User.hasMany(Round, { foreignKey: 'assignedToId', as: 'assignedRounds' });
User.hasMany(Connection, { foreignKey: 'requesterId', as: 'sentConnections' });
User.hasMany(Connection, { foreignKey: 'recipientId', as: 'receivedConnections' });
User.hasMany(Resource, { foreignKey: 'uploadedBy', as: 'uploadedResources' });

// Job Relationships
Job.belongsTo(User, { foreignKey: 'recruiterId', as: 'recruiter' });
Job.hasMany(Application, { foreignKey: 'jobId', as: 'applications' });

// Application Relationships
Application.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });
Application.belongsTo(User, { foreignKey: 'applicantId', as: 'applicant' });

// Post Relationships
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Post.hasMany(Like, { foreignKey: 'postId', as: 'likes' });

// Comment Relationships
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Comment.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

// Like Relationships
Like.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Like.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Conversation Relationships
Conversation.belongsToMany(User, { through: ConversationParticipant, foreignKey: 'conversationId', as: 'participants' });
Conversation.hasMany(Message, { foreignKey: 'conversationId', as: 'messages' });

// Message Relationships
Message.belongsTo(Conversation, { foreignKey: 'conversationId', as: 'conversation' });
Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });

// Notification Relationships
Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Story Relationships
Story.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Round Relationships
Round.belongsTo(User, { foreignKey: 'assignedToId', as: 'assignee' });

// Connection Relationships
Connection.belongsTo(User, { foreignKey: 'requesterId', as: 'requester' });
Connection.belongsTo(User, { foreignKey: 'recipientId', as: 'recipient' });

// Resource Relationships
Resource.belongsTo(User, { foreignKey: 'uploadedBy', as: 'uploader' });

const db = {
  sequelize,
  Sequelize,
  User,
  Job,
  Application,
  Post,
  Comment,
  Like,
  Conversation,
  Message,
  ConversationParticipant,
  Notification,
  Round,
  Story,
  Connection,
  Resource
};

module.exports = db;

const Sequelize = require('sequelize');
const sequelize = require('../config/db.config');

// Core Models
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

// New Models
const Organization = require('./Organization');
const OrganizationMember = require('./OrganizationMember');
const OrganizationFollower = require('./OrganizationFollower');
const Reaction = require('./Reaction');
const Share = require('./Share');
const SavedJob = require('./SavedJob');
const Hashtag = require('./Hashtag');
const PostHashtag = require('./PostHashtag');
const SearchHistory = require('./SearchHistory');
const Endorsement = require('./Endorsement');
const Recommendation = require('./Recommendation');

// ===================== User Relationships =====================
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

// New User Relationships
User.hasMany(Organization, { foreignKey: 'adminId', as: 'ownedOrganizations' });
User.hasMany(OrganizationMember, { foreignKey: 'userId', as: 'organizationMemberships' });
User.hasMany(OrganizationFollower, { foreignKey: 'userId', as: 'followedOrganizations' });
User.hasMany(Reaction, { foreignKey: 'userId', as: 'reactions' });
User.hasMany(Share, { foreignKey: 'userId', as: 'shares' });
User.hasMany(SavedJob, { foreignKey: 'userId', as: 'savedJobs' });
User.hasMany(SearchHistory, { foreignKey: 'userId', as: 'searchHistory' });
User.hasMany(Endorsement, { foreignKey: 'userId', as: 'endorsementsReceived' });
User.hasMany(Endorsement, { foreignKey: 'endorserId', as: 'endorsementsGiven' });
User.hasMany(Recommendation, { foreignKey: 'recipientId', as: 'recommendationsReceived' });
User.hasMany(Recommendation, { foreignKey: 'authorId', as: 'recommendationsGiven' });

// ===================== Job Relationships =====================
Job.belongsTo(User, { foreignKey: 'recruiterId', as: 'recruiter' });
Job.hasMany(Application, { foreignKey: 'jobId', as: 'applications' });
Job.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });
Job.hasMany(SavedJob, { foreignKey: 'jobId', as: 'saves' });

// ===================== Application Relationships =====================
Application.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });
Application.belongsTo(User, { foreignKey: 'applicantId', as: 'applicant' });

// ===================== Post Relationships =====================
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Post.hasMany(Like, { foreignKey: 'postId', as: 'likes' });
Post.hasMany(Reaction, { foreignKey: 'postId', as: 'reactions' });
Post.hasMany(Share, { foreignKey: 'originalPostId', as: 'shares' });
Post.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });
Post.belongsTo(Post, { foreignKey: 'sharedPostId', as: 'sharedPost' });
Post.belongsToMany(Hashtag, { through: PostHashtag, foreignKey: 'postId', as: 'hashtags' });

// ===================== Comment Relationships =====================
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Comment.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
Comment.belongsTo(Comment, { foreignKey: 'parentId', as: 'parent' });
Comment.hasMany(Comment, { foreignKey: 'parentId', as: 'replies' });

// ===================== Like Relationships =====================
Like.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Like.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// ===================== Reaction Relationships =====================
Reaction.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Reaction.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// ===================== Share Relationships =====================
Share.belongsTo(Post, { foreignKey: 'originalPostId', as: 'originalPost' });
Share.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// ===================== Conversation Relationships =====================
Conversation.belongsToMany(User, { through: ConversationParticipant, foreignKey: 'conversationId', as: 'participants' });
Conversation.hasMany(Message, { foreignKey: 'conversationId', as: 'messages' });

// ===================== Message Relationships =====================
Message.belongsTo(Conversation, { foreignKey: 'conversationId', as: 'conversation' });
Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });

// ===================== Notification Relationships =====================
Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// ===================== Story Relationships =====================
Story.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// ===================== Round Relationships =====================
Round.belongsTo(User, { foreignKey: 'assignedToId', as: 'assignee' });

// ===================== Connection Relationships =====================
Connection.belongsTo(User, { foreignKey: 'requesterId', as: 'requester' });
Connection.belongsTo(User, { foreignKey: 'recipientId', as: 'recipient' });

// ===================== Resource Relationships =====================
Resource.belongsTo(User, { foreignKey: 'uploadedBy', as: 'uploader' });

// ===================== Organization Relationships =====================
Organization.belongsTo(User, { foreignKey: 'adminId', as: 'admin' });
Organization.hasMany(OrganizationMember, { foreignKey: 'organizationId', as: 'members' });
Organization.hasMany(OrganizationFollower, { foreignKey: 'organizationId', as: 'followers' });
Organization.hasMany(Job, { foreignKey: 'organizationId', as: 'jobs' });
Organization.hasMany(Post, { foreignKey: 'organizationId', as: 'posts' });

OrganizationMember.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });
OrganizationMember.belongsTo(User, { foreignKey: 'userId', as: 'user' });

OrganizationFollower.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });
OrganizationFollower.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// ===================== SavedJob Relationships =====================
SavedJob.belongsTo(User, { foreignKey: 'userId', as: 'user' });
SavedJob.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });

// ===================== Hashtag Relationships =====================
Hashtag.belongsToMany(Post, { through: PostHashtag, foreignKey: 'hashtagId', as: 'posts' });

// ===================== Endorsement Relationships =====================
Endorsement.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Endorsement.belongsTo(User, { foreignKey: 'endorserId', as: 'endorser' });

// ===================== Recommendation Relationships =====================
Recommendation.belongsTo(User, { foreignKey: 'recipientId', as: 'recipient' });
Recommendation.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

// ===================== SearchHistory Relationships =====================
SearchHistory.belongsTo(User, { foreignKey: 'userId', as: 'user' });

const db = {
  sequelize,
  Sequelize,
  // Core
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
  Resource,
  // New
  Organization,
  OrganizationMember,
  OrganizationFollower,
  Reaction,
  Share,
  SavedJob,
  Hashtag,
  PostHashtag,
  SearchHistory,
  Endorsement,
  Recommendation
};

module.exports = db;

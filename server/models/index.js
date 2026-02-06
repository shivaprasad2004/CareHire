const sequelize = require('../config/db.config');
const User = require('./User');
const Job = require('./Job');
const Post = require('./Post');
const Application = require('./Application');

// Define Associations

// User <-> Post
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });

// User <-> Application (as Applicant)
User.hasMany(Application, { foreignKey: 'applicantId', as: 'applications' });
Application.belongsTo(User, { foreignKey: 'applicantId', as: 'applicant' });

// Job <-> Application
Job.hasMany(Application, { foreignKey: 'jobId', as: 'applications' });
Application.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });

// User <-> Job (as Recruiter/Poster - optional for now, assuming jobs are posted by specific users or admins)
User.hasMany(Job, { foreignKey: 'recruiterId', as: 'postedJobs' });
Job.belongsTo(User, { foreignKey: 'recruiterId', as: 'recruiter' });

const db = {
  sequelize,
  User,
  Job,
  Post,
  Application
};

module.exports = db;

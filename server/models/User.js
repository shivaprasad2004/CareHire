const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('doctor', 'nurse', 'student', 'recruiter', 'admin', 'organization'),
    defaultValue: 'student'
  },
  specialty: {
    type: DataTypes.STRING,
    allowNull: true
  },
  organization: {
    type: DataTypes.STRING,
    allowNull: true
  },
  education: {
    type: DataTypes.TEXT, // JSON string: [{ school, degree, year }]
    allowNull: true
  },
  experience: {
    type: DataTypes.TEXT, // JSON string: [{ role, company, period, description }]
    allowNull: true
  },
  skills: {
    type: DataTypes.TEXT, // JSON string: ["Skill 1", "Skill 2"]
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true
  },
  title: {
    type: DataTypes.STRING, // e.g., "Dr.", "RN", "MD"
    allowNull: true
  },
  avatarUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  coverUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  socketId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('online', 'offline', 'busy'),
    defaultValue: 'offline'
  },
  // Enhanced LinkedIn-like fields
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  headline: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pronouns: {
    type: DataTypes.STRING,
    allowNull: true
  },
  profileViews: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  searchAppearances: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  openToWork: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  openToHire: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  certifications: {
    type: DataTypes.TEXT, // JSON string
    allowNull: true
  },
  licenses: {
    type: DataTypes.TEXT, // JSON string
    allowNull: true
  },
  volunteer: {
    type: DataTypes.TEXT, // JSON string
    allowNull: true
  },
  publications: {
    type: DataTypes.TEXT, // JSON string
    allowNull: true
  },
  followersCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  followingCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  connectionsCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  profileVisibility: {
    type: DataTypes.ENUM('public', 'connections', 'private'),
    defaultValue: 'public'
  },
  emailNotifications: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  pushNotifications: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['email'] },
    { fields: ['role'] },
    { fields: ['slug'] }
  ]
});

module.exports = User;
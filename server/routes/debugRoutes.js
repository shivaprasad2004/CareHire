
const express = require('express');
const router = express.Router();
const { User } = require('../models');
const sequelize = require('../config/db.config');

router.get('/diagnose', async (req, res) => {
  try {
    const dbStatus = await sequelize.authenticate()
      .then(() => 'Connected')
      .catch(err => `Error: ${err.message}`);
    
    let userCount = 'Unknown';
    try {
      userCount = await User.count();
    } catch (err) {
      userCount = `Error: ${err.message}`;
    }

    const envVars = {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      DATABASE_URL: process.env.DATABASE_URL ? 'Set (Hidden)' : 'Missing',
      JWT_SECRET: process.env.JWT_SECRET ? 'Set (Hidden)' : 'Missing',
      CLIENT_URL: process.env.CLIENT_URL,
    };

    res.json({
      status: 'success',
      timestamp: new Date().toISOString(),
      database: {
        connection: dbStatus,
        userCount: userCount
      },
      environment: envVars
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
      stack: err.stack
    });
  }
});

module.exports = router;

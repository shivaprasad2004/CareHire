const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const http = require('http');
require('dotenv').config();

const db = require('./models');
const { initializeSocket } = require('./sockets');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const postRoutes = require('./routes/postRoutes');
const roundRoutes = require('./routes/roundRoutes');
const storyRoutes = require('./routes/storyRoutes');
const connectionRoutes = require('./routes/connectionRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const messageRoutes = require('./routes/messageRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const debugRoutes = require('./routes/debugRoutes');
const errorHandler = require('./middleware/errorHandler');

const { limiter } = require('./middleware/rateLimiter');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Initialize Socket.io
initializeSocket(server);

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(morgan('dev'));
app.use(limiter); // Apply global rate limiter
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/rounds', roundRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/debug', debugRoutes);

// Health Check
app.get('/', (req, res) => {
  res.json({ message: 'CareHire API is running...' });
});

// Test Endpoint for JSON Verification
app.get('/api/test', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'Backend is serving JSON correctly',
    timestamp: new Date().toISOString()
  });
});

// 404 Handler - Must come after all routes but before Global Error Handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Global Error Handler
app.use(errorHandler);

const logger = require('./utils/logger'); // Import logger

// ... imports ...

// Database Connection & Server Start
db.sequelize.sync({ alter: true }) // Use alter: true to update tables without dropping
  .then(() => {
    logger.info('Database synced successfully.');
    // Log Environment Checks
    logger.info(`Environment: NODE_ENV=${process.env.NODE_ENV}, PORT=${PORT}`);
    logger.info(`JWT_SECRET Present: ${!!process.env.JWT_SECRET}`);
    logger.info(`DATABASE_URL Present: ${!!process.env.DATABASE_URL}`);
    
    server.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(`Failed to sync database: ${err.message}`);
  });

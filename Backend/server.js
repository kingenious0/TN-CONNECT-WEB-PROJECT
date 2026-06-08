require('dotenv').config();
const app = require('./src/app');
const { logger } = require('./src/utils/logger');
const { connectDatabase } = require('./src/config/database');
const { connectRedis } = require('./src/config/redis');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to PostgreSQL
    await connectDatabase();
    logger.info('✅ PostgreSQL connected');

    // Connect to Redis
    try {
      await connectRedis();
      logger.info('✅ Redis connected');
    } catch (redisError) {
      logger.warn('⚠️  Redis connection failed — OTP and session features will be unavailable:', redisError.message);
      logger.warn('⚠️  Server will start without Redis. Install and start Redis for full functionality.');
    }

    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });

    // Graceful shutdown
    const shutdown = async (signal) => {
      logger.info(`\n${signal} received. Shutting down gracefully...`);
      server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
      });

      // Force close after 10 seconds
      setTimeout(() => {
        logger.error('Forced shutdown — could not close connections in time');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

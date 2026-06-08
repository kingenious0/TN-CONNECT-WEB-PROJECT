require('dotenv').config();
const app = require('./src/app');
const { logger } = require('./src/utils/logger');
const { connectDatabase } = require('./src/config/database');
// const { connectRedis } = require('./src/config/redis');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to PostgreSQL
    await connectDatabase();
    logger.info('✅ PostgreSQL connected');

    // Connect to Redis (uncomment when ready)
    // await connectRedis();
    // logger.info('✅ Redis connected');

    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

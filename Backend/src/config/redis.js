/**
 * Redis Configuration
 * Uses ioredis for connection management
 */
const Redis = require('ioredis');
const env = require('./env');
const { logger } = require('../utils/logger');

let redisClient = null;

function createRedisClient() {
  const client = new Redis({
    host: env.redis.host,
    port: env.redis.port,
    password: env.redis.password,
    db: env.redis.db,
    retryStrategy: (times) => {
      if (times > 3) {
        logger.error('Redis: max retries reached, giving up');
        return null;
      }
      return Math.min(times * 200, 2000);
    },
    lazyConnect: true,
  });

  client.on('connect', () => logger.info('Redis connected'));
  client.on('error', (err) => logger.error('Redis error:', err.message));
  client.on('close', () => logger.warn('Redis connection closed'));

  return client;
}

async function connectRedis() {
  redisClient = createRedisClient();
  await redisClient.connect();
  return redisClient;
}

function getRedisClient() {
  if (!redisClient) {
    throw new Error('Redis client not initialized. Call connectRedis() first.');
  }
  return redisClient;
}

module.exports = {
  connectRedis,
  getRedisClient,
};

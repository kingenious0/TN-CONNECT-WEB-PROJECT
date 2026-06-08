/**
 * Authentication Middleware
 * Verifies JWT access tokens on protected routes
 * Checks Redis blacklist for revoked tokens
 */
const { verifyAccessToken } = require('../config/jwt');
const { getRedisClient } = require('../config/redis');
const { logger } = require('../utils/logger');

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);

    // Check if token has been blacklisted (logout)
    if (decoded.jti) {
      try {
        const redis = getRedisClient();
        const isBlacklisted = await redis.get(`blacklist:${decoded.jti}`);
        if (isBlacklisted) {
          return res.status(401).json({
            success: false,
            message: 'Token has been revoked. Please log in again.',
          });
        }
      } catch (redisError) {
        // If Redis is down, log but don't block the request
        logger.warn('[AUTH] Redis blacklist check failed:', redisError.message);
      }
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
}

module.exports = { authenticate };

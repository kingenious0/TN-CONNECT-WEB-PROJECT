/**
 * Health Module
 * Detailed health checks for DB, Redis, and services
 */
const express = require('express');
const router = express.Router();

const { pool } = require('../../config/database');
const { getRedisClient } = require('../../config/redis');
const { successResponse } = require('../../utils/response');

/**
 * GET /api/health/detailed — Check DB and Redis connectivity
 */
router.get('/detailed', async (req, res) => {
  const checks = {
    server: 'ok',
    database: 'unknown',
    redis: 'unknown',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };

  // Database check
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    checks.database = 'ok';
  } catch (error) {
    checks.database = `error: ${error.message}`;
  }

  // Redis check
  try {
    const redis = getRedisClient();
    await redis.ping();
    checks.redis = 'ok';
  } catch (error) {
    checks.redis = `error: ${error.message}`;
  }

  const allHealthy = checks.database === 'ok' && checks.redis === 'ok';
  const statusCode = allHealthy ? 200 : 503;

  return res.status(statusCode).json({
    success: allHealthy,
    message: allHealthy ? 'All systems operational' : 'Some services are unhealthy',
    data: checks,
  });
});

module.exports = router;

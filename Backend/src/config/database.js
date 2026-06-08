/**
 * PostgreSQL Database Configuration
 * Uses node-postgres (pg) with connection pooling
 */
const { Pool } = require('pg');
const env = require('./env');
const { logger } = require('../utils/logger');

const pool = new Pool({
  host: env.db.host,
  port: env.db.port,
  database: env.db.name,
  user: env.db.user,
  password: env.db.password,
  ssl: env.db.ssl ? { rejectUnauthorized: false } : false,
  min: env.db.pool.min,
  max: env.db.pool.max,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// Log pool errors
pool.on('error', (err) => {
  logger.error('Unexpected PostgreSQL pool error:', err);
});

/**
 * Connect to the database and verify the connection
 */
async function connectDatabase() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT NOW()');
    logger.info(`PostgreSQL connected at ${result.rows[0].now}`);
  } finally {
    client.release();
  }
}

/**
 * Execute a parameterized query
 * @param {string} text - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise<object>} Query result
 */
async function query(text, params) {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  logger.debug(`Query executed in ${duration}ms — rows: ${result.rowCount}`);
  return result;
}

/**
 * Get a client from the pool for transactions
 * @returns {Promise<object>} Pool client
 */
async function getClient() {
  return pool.connect();
}

module.exports = {
  pool,
  query,
  getClient,
  connectDatabase,
};

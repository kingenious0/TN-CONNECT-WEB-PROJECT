/**
 * JWT Configuration
 * Token generation and verification helpers
 */
const jwt = require('jsonwebtoken');
const env = require('./env');

/**
 * Generate an access token
 * @param {object} payload - Data to encode in token
 * @returns {string} Signed JWT access token
 */
function generateAccessToken(payload) {
  return jwt.sign(payload, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessExpiresIn,
  });
}

/**
 * Generate a refresh token
 * @param {object} payload - Data to encode in token
 * @returns {string} Signed JWT refresh token
 */
function generateRefreshToken(payload) {
  return jwt.sign(payload, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshExpiresIn,
  });
}

/**
 * Verify an access token
 * @param {string} token - JWT to verify
 * @returns {object} Decoded payload
 */
function verifyAccessToken(token) {
  return jwt.verify(token, env.jwt.accessSecret);
}

/**
 * Verify a refresh token
 * @param {string} token - JWT to verify
 * @returns {object} Decoded payload
 */
function verifyRefreshToken(token) {
  return jwt.verify(token, env.jwt.refreshSecret);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};

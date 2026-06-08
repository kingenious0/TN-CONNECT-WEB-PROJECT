/**
 * Auth Service
 * Business logic for registration, login, token refresh, logout, and password reset
 */
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { query } = require('../../config/database');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../../config/jwt');
const { getRedisClient } = require('../../config/redis');
const { AppError } = require('../../utils/AppError');
const { logger } = require('../../utils/logger');
const env = require('../../config/env');

const SALT_ROUNDS = 12;

/**
 * Register a new member
 */
async function register({ fullName, school, programme, phone, email, password }) {
  // Check for duplicate phone
  const phoneCheck = await query('SELECT id FROM members WHERE phone = $1', [phone]);
  if (phoneCheck.rowCount > 0) {
    throw new AppError('A member with this phone number already exists.', 409);
  }

  // Check for duplicate email (if provided)
  if (email) {
    const emailCheck = await query('SELECT id FROM members WHERE email = $1', [email]);
    if (emailCheck.rowCount > 0) {
      throw new AppError('A member with this email address already exists.', 409);
    }
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  // Insert member
  const result = await query(
    `INSERT INTO members (full_name, school, programme, phone, email, password_hash, is_verified, is_active)
     VALUES ($1, $2, $3, $4, $5, $6, false, true)
     RETURNING id, full_name, school, programme, phone, email, is_verified, is_active, created_at`,
    [fullName, school, programme, phone, email || null, passwordHash]
  );

  logger.info(`[AUTH] New member registered: ${result.rows[0].id}`);
  return result.rows[0];
}

/**
 * Login a member
 */
async function login({ identifier, password, rememberMe }) {
  // Find member by phone or email
  const result = await query(
    'SELECT * FROM members WHERE phone = $1 OR email = $1',
    [identifier]
  );

  if (result.rowCount === 0) {
    throw new AppError('Invalid credentials.', 401);
  }

  const member = result.rows[0];

  // Check if account is active
  if (!member.is_active) {
    throw new AppError('Your account has been deactivated. Please contact support.', 403);
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, member.password_hash);
  if (!isMatch) {
    throw new AppError('Invalid credentials.', 401);
  }

  // Generate tokens with unique jti
  const jti = uuidv4();
  const tokenPayload = {
    id: member.id,
    type: 'member',
    jti,
  };

  const accessToken = generateAccessToken(tokenPayload);
  const refreshExpiresIn = rememberMe ? '30d' : env.jwt.refreshExpiresIn;
  const refreshToken = generateRefreshToken({ ...tokenPayload, rememberMe });

  // Update last_login_at
  await query('UPDATE members SET last_login_at = NOW() WHERE id = $1', [member.id]);

  logger.info(`[AUTH] Member logged in: ${member.id}`);

  return {
    accessToken,
    refreshToken,
    member: {
      id: member.id,
      fullName: member.full_name,
      school: member.school,
      programme: member.programme,
      phone: member.phone,
      email: member.email,
      isVerified: member.is_verified,
      isActive: member.is_active,
    },
  };
}

/**
 * Refresh an access token
 */
async function refreshToken(token) {
  let decoded;
  try {
    decoded = verifyRefreshToken(token);
  } catch (error) {
    throw new AppError('Invalid or expired refresh token.', 401);
  }

  // Check if token is blacklisted
  const redis = getRedisClient();
  const isBlacklisted = await redis.get(`blacklist:${decoded.jti}`);
  if (isBlacklisted) {
    throw new AppError('Token has been revoked.', 401);
  }

  // Verify member/admin still exists and is active
  if (decoded.type === 'member') {
    const result = await query('SELECT id, is_active FROM members WHERE id = $1', [decoded.id]);
    if (result.rowCount === 0 || !result.rows[0].is_active) {
      throw new AppError('Account not found or deactivated.', 401);
    }
  }

  // Generate new token pair
  const newJti = uuidv4();
  const newPayload = {
    id: decoded.id,
    type: decoded.type,
    role: decoded.role,
    jti: newJti,
  };

  // Blacklist old refresh token
  const oldTtl = decoded.exp - Math.floor(Date.now() / 1000);
  if (oldTtl > 0) {
    await redis.set(`blacklist:${decoded.jti}`, '1', 'EX', oldTtl);
  }

  const accessToken = generateAccessToken(newPayload);
  const newRefreshToken = generateRefreshToken(newPayload);

  return { accessToken, refreshToken: newRefreshToken };
}

/**
 * Logout — blacklist the token's jti
 */
async function logout(jti, exp) {
  const redis = getRedisClient();
  const ttl = exp - Math.floor(Date.now() / 1000);
  if (ttl > 0) {
    await redis.set(`blacklist:${jti}`, '1', 'EX', ttl);
  }
  logger.info(`[AUTH] Token blacklisted: ${jti}`);
}

/**
 * Forgot password — generates a reset token
 */
async function forgotPassword(identifier) {
  // Find member by phone or email
  const result = await query(
    'SELECT id, phone, email FROM members WHERE phone = $1 OR email = $1',
    [identifier]
  );

  if (result.rowCount === 0) {
    // Return silently to prevent user enumeration
    logger.warn(`[AUTH] Forgot password attempt for unknown identifier: ${identifier}`);
    return { sent: true };
  }

  const member = result.rows[0];

  // Generate a short-lived reset token (15 minutes)
  const resetPayload = {
    id: member.id,
    type: 'password_reset',
    jti: uuidv4(),
  };
  const resetToken = generateAccessToken(resetPayload);

  // Store in Redis with 15-minute TTL
  const redis = getRedisClient();
  await redis.set(`reset:${member.id}`, resetToken, 'EX', 900);

  // In development, log the token
  if (env.nodeEnv === 'development') {
    logger.info(`[AUTH] Password reset token for ${member.id}: ${resetToken}`);
  }

  logger.info(`[AUTH] Password reset requested for member: ${member.id}`);
  return { sent: true, ...(env.nodeEnv === 'development' && { resetToken }) };
}

/**
 * Reset password using token
 */
async function resetPassword(token, newPassword) {
  let decoded;
  try {
    decoded = require('jsonwebtoken').verify(token, env.jwt.accessSecret);
  } catch (error) {
    throw new AppError('Invalid or expired reset token.', 400);
  }

  if (decoded.type !== 'password_reset') {
    throw new AppError('Invalid reset token.', 400);
  }

  // Verify token is still in Redis (not already used)
  const redis = getRedisClient();
  const storedToken = await redis.get(`reset:${decoded.id}`);
  if (!storedToken || storedToken !== token) {
    throw new AppError('Reset token has already been used or has expired.', 400);
  }

  // Hash new password and update
  const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await query('UPDATE members SET password_hash = $1 WHERE id = $2', [passwordHash, decoded.id]);

  // Remove the reset token from Redis
  await redis.del(`reset:${decoded.id}`);

  logger.info(`[AUTH] Password reset completed for member: ${decoded.id}`);
  return { reset: true };
}

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
};

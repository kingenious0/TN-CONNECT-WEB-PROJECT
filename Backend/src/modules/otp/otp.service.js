/**
 * OTP Service
 * Handles OTP generation, verification, and resend via Redis
 *
 * Redis key structure:
 *   otp:{phone} → Hash { code: "123456", attempts: 0 }
 *   TTL: OTP_EXPIRY_SECONDS (default 300 = 5 minutes)
 *
 * Race condition safety:
 *   verifyOTP increments attempts BEFORE checking the code,
 *   so concurrent requests cannot both get "first attempt" status.
 */
const crypto = require('crypto');
const { getRedisClient } = require('../../config/redis');
const { logger } = require('../../utils/logger');
const env = require('../../config/env');

const OTP_EXPIRY = env.otp?.expirySeconds || 300;
const OTP_MAX_ATTEMPTS = env.otp?.maxAttempts || 5;

/**
 * Generate a 6-digit OTP and store in Redis
 * @param {string} phone - Phone number (E.164 format)
 * @returns {Promise<string>} The generated OTP code
 */
async function generateOTP(phone) {
  const redis = getRedisClient();
  const key = `otp:${phone}`;

  // Generate cryptographically random 6-digit code
  const code = crypto.randomInt(100000, 999999).toString();

  // Store as Redis hash with TTL
  await redis.hset(key, 'code', code, 'attempts', '0');
  await redis.expire(key, OTP_EXPIRY);

  logger.info(`[OTP] Generated OTP for ${phone.slice(0, 6)}****`);
  return code;
}

/**
 * Verify an OTP code — increments attempts BEFORE checking to prevent race conditions
 * @param {string} phone - Phone number
 * @param {string} code  - OTP code to verify
 * @returns {Promise<{ valid: boolean, locked?: boolean, attemptsRemaining?: number }>}
 */
async function verifyOTP(phone, code) {
  const redis = getRedisClient();
  const key = `otp:${phone}`;

  // Check if OTP exists
  const exists = await redis.exists(key);
  if (!exists) {
    return { valid: false, expired: true };
  }

  // INCREMENT FIRST — this is the race condition fix
  const attempts = await redis.hincrby(key, 'attempts', 1);

  // Check if locked out
  if (attempts > OTP_MAX_ATTEMPTS) {
    await redis.del(key);
    logger.warn(`[OTP] Phone ${phone.slice(0, 6)}**** locked out — max attempts exceeded`);
    return { valid: false, locked: true };
  }

  // Now check the code
  const storedCode = await redis.hget(key, 'code');
  if (storedCode === code) {
    await redis.del(key); // Clean up after successful verification
    logger.info(`[OTP] Verified successfully for ${phone.slice(0, 6)}****`);
    return { valid: true };
  }

  const attemptsRemaining = OTP_MAX_ATTEMPTS - attempts;
  logger.warn(`[OTP] Invalid code for ${phone.slice(0, 6)}**** — ${attemptsRemaining} attempts remaining`);
  return { valid: false, attemptsRemaining };
}

/**
 * Resend OTP — deletes existing and generates new
 * @param {string} phone - Phone number
 * @returns {Promise<string>} The new OTP code
 */
async function resendOTP(phone) {
  const redis = getRedisClient();
  const key = `otp:${phone}`;

  // Delete existing OTP if any
  await redis.del(key);

  // Generate fresh OTP
  return generateOTP(phone);
}

module.exports = { generateOTP, verifyOTP, resendOTP };

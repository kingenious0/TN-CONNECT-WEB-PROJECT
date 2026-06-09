/**
 * SMS Configuration
 * Placeholder for SMS provider integration (e.g., Africa's Talking, Twilio)
 */
const env = require('./env');
const { logger } = require('../utils/logger');

/**
 * Send an SMS message
 * @param {string} to - Recipient phone number
 * @param {string} message - SMS content
 * @returns {Promise<object>} Send result
 */
async function sendSMS(to, message) {
  // TODO: Implement SMS provider integration
  logger.info(`[SMS] Sending to ${to}: ${message}`);

  if (env.nodeEnv === 'development') {
    logger.warn('[SMS] Development mode — SMS not actually sent');
    return { success: true, provider: 'mock', to, message };
  }

  // Example Africa's Talking integration:
  // const AfricasTalking = require('africastalking');
  // const at = AfricasTalking({ apiKey: env.sms.apiKey, username: env.sms.username });
  // const sms = at.SMS;
  // return sms.send({ to: [to], message, from: env.sms.senderId });

  throw new Error('SMS provider not configured');
}

module.exports = { sendSMS };

/**
 * Notifications Service
 * Wraps SMS and email config for use by other modules
 */
const { sendSMS } = require('../../config/sms');
const { sendMail } = require('../../config/mail');
const { logger } = require('../../utils/logger');

/**
 * Send SMS notification
 */
async function sendSMSNotification(to, message) {
  try {
    const result = await sendSMS(to, message);
    logger.info(`[NOTIFICATION] SMS sent to ${to.slice(0, 6)}****`);
    return result;
  } catch (error) {
    logger.error(`[NOTIFICATION] SMS failed to ${to}:`, error.message);
    throw error;
  }
}

/**
 * Send email notification
 */
async function sendEmailNotification(to, subject, html, text) {
  try {
    const result = await sendMail({ to, subject, html, text });
    logger.info(`[NOTIFICATION] Email sent to ${to}`);
    return result;
  } catch (error) {
    logger.error(`[NOTIFICATION] Email failed to ${to}:`, error.message);
    throw error;
  }
}

module.exports = { sendSMSNotification, sendEmailNotification };

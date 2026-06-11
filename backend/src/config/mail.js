/**
 * Mail Configuration
 * Uses Nodemailer for email delivery
 */
const nodemailer = require('nodemailer');
const env = require('./env');
const { logger } = require('../utils/logger');

let transporter = null;

/**
 * Get or create the mail transporter
 * @returns {object} Nodemailer transporter
 */
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.mail.host,
      port: env.mail.port,
      secure: env.mail.port === 465,
      auth: {
        user: env.mail.user,
        pass: env.mail.password,
      },
    });
  }
  return transporter;
}

/**
 * Send an email
 * @param {object} options - { to, subject, text, html }
 * @returns {Promise<object>} Send result
 */
async function sendMail({ to, subject, text, html }) {
  // TODO: Implement actual mail sending when credentials are configured
  logger.info(`[MAIL] Sending to ${to}: ${subject}`);

  if (env.nodeEnv === 'development') {
    logger.warn('[MAIL] Development mode — email not actually sent');
    return { success: true, provider: 'mock', to, subject };
  }

  const transport = getTransporter();
  return transport.sendMail({
    from: env.mail.from,
    to,
    subject,
    text,
    html,
  });
}

module.exports = { sendMail, getTransporter };

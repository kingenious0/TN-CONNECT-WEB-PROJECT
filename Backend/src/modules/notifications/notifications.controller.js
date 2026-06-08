/**
 * Notifications Controller
 */
const notificationsService = require('./notifications.service');
const { successResponse, errorResponse } = require('../../utils/response');

/**
 * POST /api/admin/notifications/send
 * Admin-triggered notification (SMS or email)
 */
async function sendNotification(req, res, next) {
  try {
    const { type, to, message, subject, html } = req.body;

    if (type === 'sms') {
      await notificationsService.sendSMSNotification(to, message);
      return successResponse(res, null, 'SMS notification sent.');
    }

    if (type === 'email') {
      await notificationsService.sendEmailNotification(to, subject, html, message);
      return successResponse(res, null, 'Email notification sent.');
    }

    return errorResponse(res, 'Invalid notification type. Use "sms" or "email".', 400);
  } catch (error) {
    next(error);
  }
}

module.exports = { sendNotification };

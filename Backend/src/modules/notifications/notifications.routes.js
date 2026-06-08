/**
 * Notifications Routes
 * POST /api/admin/notifications/send — Send a notification (admin)
 */
const express = require('express');
const router = express.Router();

const notificationsController = require('./notifications.controller');
const { authenticate } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');

router.post(
  '/send',
  authenticate,
  authorize('admin', 'super_admin'),
  notificationsController.sendNotification
);

module.exports = router;

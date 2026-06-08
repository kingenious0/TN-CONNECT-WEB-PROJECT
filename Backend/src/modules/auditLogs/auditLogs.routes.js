/**
 * Audit Logs Routes
 * GET /api/admin/audit-logs — List audit logs (super_admin only)
 */
const express = require('express');
const router = express.Router();

const auditLogsController = require('./auditLogs.controller');
const { authenticate } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');

router.get(
  '/',
  authenticate,
  authorize('super_admin'),
  auditLogsController.getLogs
);

module.exports = router;

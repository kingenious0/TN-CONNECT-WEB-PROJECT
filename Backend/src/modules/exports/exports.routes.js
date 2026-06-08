/**
 * Exports Routes
 * GET /api/admin/exports/members — Export member data (CSV/Excel)
 */
const express = require('express');
const router = express.Router();

const exportsController = require('./exports.controller');
const { authenticate } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');

router.get(
  '/members',
  authenticate,
  authorize('admin', 'super_admin'),
  exportsController.exportMembers
);

module.exports = router;

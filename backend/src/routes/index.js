/**
 * API Routes Index
 * All route files are registered here and mounted in app.js
 *
 * Usage in app.js:
 *   const routes = require('./routes');
 *   app.use('/api', routes);
 */
const express = require('express');
const router = express.Router();

// ──────────────── Public routes ────────────────
router.use('/auth', require('../modules/auth/auth.routes'));
router.use('/otp', require('../modules/otp/otp.routes'));
router.use('/contacts', require('../modules/contacts/contacts.routes'));
router.use('/health', require('../modules/health/health.routes'));

// ──────────────── Member routes ────────────────
const { memberRouter } = require('../modules/members/members.routes');
router.use('/members', memberRouter);

// ──────────────── Admin routes ────────────────
const { adminMemberRouter } = require('../modules/members/members.routes');
router.use('/admin', require('../modules/admins/admins.routes'));
router.use('/admin/members', adminMemberRouter);
router.use('/admin/dashboard', require('../modules/dashboard/dashboard.routes'));
router.use('/admin/exports', require('../modules/exports/exports.routes'));
router.use('/admin/audit-logs', require('../modules/auditLogs/auditLogs.routes'));
router.use('/admin/notifications', require('../modules/notifications/notifications.routes'));

module.exports = router;

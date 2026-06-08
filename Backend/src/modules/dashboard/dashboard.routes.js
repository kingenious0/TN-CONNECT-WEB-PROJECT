/**
 * Dashboard Routes
 * GET /api/admin/dashboard/stats   — Summary statistics
 * GET /api/admin/dashboard/recent  — Recent registrations
 */
const express = require('express');
const router = express.Router();

const dashboardController = require('./dashboard.controller');
const { authenticate } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');

router.get('/stats', authenticate, authorize('admin', 'super_admin'), dashboardController.getStats);
router.get('/recent', authenticate, authorize('admin', 'super_admin'), dashboardController.getRecentRegistrations);

module.exports = router;

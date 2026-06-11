/**
 * Dashboard Controller
 */
const dashboardService = require('./dashboard.service');
const { successResponse } = require('../../utils/response');

/**
 * GET /api/admin/dashboard/stats
 */
async function getStats(req, res, next) {
  try {
    const stats = await dashboardService.getStats();
    return successResponse(res, stats, 'Dashboard statistics retrieved.');
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/admin/dashboard/recent
 */
async function getRecentRegistrations(req, res, next) {
  try {
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const members = await dashboardService.getRecentRegistrations(limit);
    return successResponse(res, members, 'Recent registrations retrieved.');
  } catch (error) {
    next(error);
  }
}

module.exports = { getStats, getRecentRegistrations };

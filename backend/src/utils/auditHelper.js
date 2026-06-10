/**
 * Audit Helper
 * Convenience wrapper for logging admin actions from any controller
 *
 * Usage:
 *   const { logAction } = require('../../utils/auditHelper');
 *   await logAction(req, 'MEMBER_UPDATED', 'member', memberId, { changedFields: ['name'] });
 */
const auditLogsService = require('../modules/auditLogs/auditLogs.service');

/**
 * Log an admin action
 * @param {object} req - Express request (extracts admin ID and IP)
 * @param {string} action - Action name (e.g., 'MEMBER_DELETED', 'MEMBER_STATUS_CHANGED')
 * @param {string} targetType - Entity type ('member', 'admin', etc.)
 * @param {string} targetId - ID of the affected entity
 * @param {object} details - Additional details to store as JSONB
 */
async function logAction(req, action, targetType, targetId, details = null) {
  const adminId = req.user?.id;
  const ipAddress = req.ip || req.connection?.remoteAddress;

  // Fire and forget — never throws
  await auditLogsService.createLog({
    adminId,
    action,
    targetType,
    targetId,
    details,
    ipAddress,
  });
}

module.exports = { logAction };

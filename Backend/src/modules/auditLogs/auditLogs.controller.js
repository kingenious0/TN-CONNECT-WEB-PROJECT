/**
 * Audit Logs Controller
 */
const auditLogsService = require('./auditLogs.service');
const { paginatedResponse } = require('../../utils/response');

/**
 * GET /api/admin/audit-logs
 */
async function getLogs(req, res, next) {
  try {
    const filters = {
      adminId: req.query.adminId,
      action: req.query.action,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
      page: req.query.page,
      limit: req.query.limit,
    };

    const result = await auditLogsService.getLogs(filters);
    return paginatedResponse(
      res,
      result.logs,
      result.pagination.page,
      result.pagination.limit,
      result.pagination.total
    );
  } catch (error) {
    next(error);
  }
}

module.exports = { getLogs };

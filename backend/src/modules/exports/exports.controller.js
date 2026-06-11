/**
 * Exports Controller
 */
const exportsService = require('./exports.service');

/**
 * GET /api/admin/exports/members?format=csv|excel&...filters
 */
async function exportMembers(req, res, next) {
  try {
    const format = req.query.format === 'excel' ? 'excel' : 'csv';

    const filters = {
      search: req.query.search,
      school: req.query.school,
      programme: req.query.programme,
      isVerified: req.query.isVerified !== undefined ? req.query.isVerified === 'true' : undefined,
      isActive: req.query.isActive !== undefined ? req.query.isActive === 'true' : undefined,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
    };

    const result = await exportsService.exportMembers(filters, format);

    res.setHeader('Content-Type', result.contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);

    return res.send(result.data);
  } catch (error) {
    next(error);
  }
}

module.exports = { exportMembers };

/**
 * Audit Logs Service
 * Records and retrieves admin action history
 * The createLog function is fire-and-forget — it never throws to the caller
 */
const { query } = require('../../config/database');
const { logger } = require('../../utils/logger');

/**
 * Create an audit log entry (fire-and-forget)
 */
async function createLog({ adminId, action, targetType, targetId, details, ipAddress }) {
  try {
    await query(
      `INSERT INTO audit_logs (admin_id, action, target_type, target_id, details, ip_address)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [adminId, action, targetType || null, targetId || null, details ? JSON.stringify(details) : null, ipAddress || null]
    );
  } catch (error) {
    // Never let audit logging failures break the main flow
    logger.error('[AUDIT] Failed to create audit log:', error.message);
  }
}

/**
 * Get audit logs with filters and pagination
 */
async function getLogs(filters = {}) {
  const page = Math.max(1, parseInt(filters.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(filters.limit, 10) || 20));
  const offset = (page - 1) * limit;

  const conditions = [];
  const params = [];
  let paramIndex = 1;

  if (filters.adminId) {
    conditions.push(`al.admin_id = $${paramIndex++}`);
    params.push(filters.adminId);
  }

  if (filters.action) {
    conditions.push(`al.action = $${paramIndex++}`);
    params.push(filters.action);
  }

  if (filters.dateFrom) {
    conditions.push(`al.created_at >= $${paramIndex++}`);
    params.push(filters.dateFrom);
  }

  if (filters.dateTo) {
    conditions.push(`al.created_at <= $${paramIndex++}`);
    params.push(filters.dateTo);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Count total
  const countResult = await query(
    `SELECT COUNT(*) AS total FROM audit_logs al ${whereClause}`,
    params
  );
  const total = parseInt(countResult.rows[0].total, 10);

  // Fetch with admin name join
  const dataParams = [...params, limit, offset];
  const dataResult = await query(
    `SELECT al.id, al.admin_id, a.full_name AS admin_name, al.action, al.target_type, al.target_id,
            al.details, al.ip_address, al.created_at
     FROM audit_logs al
     LEFT JOIN admins a ON al.admin_id = a.id
     ${whereClause}
     ORDER BY al.created_at DESC
     LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
    dataParams
  );

  return {
    logs: dataResult.rows,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

module.exports = { createLog, getLogs };

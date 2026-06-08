/**
 * Dashboard Service
 * Aggregated statistics for the admin dashboard
 */
const { query } = require('../../config/database');

/**
 * Get dashboard summary statistics
 */
async function getStats() {
  const result = await query(`
    SELECT
      COUNT(*)::int                                          AS total_members,
      COUNT(*) FILTER (WHERE is_verified = true)::int        AS verified_members,
      COUNT(*) FILTER (WHERE is_active = true)::int          AS active_members,
      COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days')::int AS recent_registrations
    FROM members
  `);

  return result.rows[0];
}

/**
 * Get most recent registrations
 */
async function getRecentRegistrations(limit = 10) {
  const result = await query(
    `SELECT id, full_name, school, programme, phone, is_verified, is_active, created_at
     FROM members
     ORDER BY created_at DESC
     LIMIT $1`,
    [limit]
  );

  return result.rows;
}

module.exports = { getStats, getRecentRegistrations };

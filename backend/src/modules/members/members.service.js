/**
 * Members Service
 * Business logic for member profile management and admin member operations
 *
 * Key design: getAllMembers uses a dynamic query builder that assembles
 * the WHERE clause from whichever filters are present — no hardcoded
 * if/else branches for filter combinations.
 */
const bcrypt = require('bcryptjs');
const { query } = require('../../config/database');
const { AppError } = require('../../utils/AppError');
const { logger } = require('../../utils/logger');

const SALT_ROUNDS = 12;

// ──────────────────────────────────────────────
// Member-facing operations (own profile)
// ──────────────────────────────────────────────

/**
 * Get member profile by ID
 */
async function getProfile(memberId) {
  const result = await query(
    `SELECT id, full_name, school, programme, phone, email, is_verified, is_active, created_at, updated_at, last_login_at
     FROM members WHERE id = $1`,
    [memberId]
  );

  if (result.rowCount === 0) {
    throw new AppError('Member not found.', 404);
  }

  return result.rows[0];
}

/**
 * Update own profile (name, school, programme, email only — phone is locked)
 */
async function updateProfile(memberId, data) {
  const { fullName, school, programme, email } = data;

  // Check email uniqueness if being updated
  if (email) {
    const emailCheck = await query(
      'SELECT id FROM members WHERE email = $1 AND id != $2',
      [email, memberId]
    );
    if (emailCheck.rowCount > 0) {
      throw new AppError('This email address is already in use.', 409);
    }
  }

  const result = await query(
    `UPDATE members
     SET full_name = COALESCE($1, full_name),
         school = COALESCE($2, school),
         programme = COALESCE($3, programme),
         email = COALESCE($4, email)
     WHERE id = $5
     RETURNING id, full_name, school, programme, phone, email, is_verified, is_active, updated_at`,
    [fullName, school, programme, email || null, memberId]
  );

  if (result.rowCount === 0) {
    throw new AppError('Member not found.', 404);
  }

  logger.info(`[MEMBERS] Profile updated: ${memberId}`);
  return result.rows[0];
}

/**
 * Change own password
 */
async function changePassword(memberId, currentPassword, newPassword) {
  // Get current hash
  const result = await query('SELECT password_hash FROM members WHERE id = $1', [memberId]);
  if (result.rowCount === 0) {
    throw new AppError('Member not found.', 404);
  }

  // Verify current password
  const isMatch = await bcrypt.compare(currentPassword, result.rows[0].password_hash);
  if (!isMatch) {
    throw new AppError('Current password is incorrect.', 400);
  }

  // Hash and update
  const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await query('UPDATE members SET password_hash = $1 WHERE id = $2', [passwordHash, memberId]);

  logger.info(`[MEMBERS] Password changed: ${memberId}`);
  return { changed: true };
}

// ──────────────────────────────────────────────
// Admin-facing operations
// ──────────────────────────────────────────────

/**
 * Build dynamic WHERE clause from filter parameters
 * Each filter is optional; only present filters are included
 */
function buildMemberQuery(filters) {
  const conditions = [];
  const params = [];
  let paramIndex = 1;

  // Free-text search across name, phone, email
  if (filters.search) {
    conditions.push(
      `(full_name ILIKE $${paramIndex} OR phone ILIKE $${paramIndex} OR email ILIKE $${paramIndex})`
    );
    params.push(`%${filters.search}%`);
    paramIndex++;
  }

  // Exact match filters
  if (filters.school) {
    conditions.push(`school = $${paramIndex++}`);
    params.push(filters.school);
  }

  if (filters.programme) {
    conditions.push(`programme = $${paramIndex++}`);
    params.push(filters.programme);
  }

  // Boolean filters
  if (filters.isVerified !== undefined && filters.isVerified !== null) {
    conditions.push(`is_verified = $${paramIndex++}`);
    params.push(filters.isVerified);
  }

  if (filters.isActive !== undefined && filters.isActive !== null) {
    conditions.push(`is_active = $${paramIndex++}`);
    params.push(filters.isActive);
  }

  // Date range filters
  if (filters.dateFrom) {
    conditions.push(`created_at >= $${paramIndex++}`);
    params.push(filters.dateFrom);
  }

  if (filters.dateTo) {
    conditions.push(`created_at <= $${paramIndex++}`);
    params.push(filters.dateTo);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  return { whereClause, params, paramIndex };
}

/**
 * Get all members with dynamic filters, pagination, and sorting
 */
async function getAllMembers(filters = {}) {
  const page = Math.max(1, parseInt(filters.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(filters.limit, 10) || 20));
  const offset = (page - 1) * limit;

  // Validate sort parameters
  const allowedSortFields = ['full_name', 'school', 'programme', 'phone', 'created_at', 'is_verified', 'is_active'];
  const sortBy = allowedSortFields.includes(filters.sortBy) ? filters.sortBy : 'created_at';
  const sortOrder = filters.sortOrder === 'asc' ? 'ASC' : 'DESC';

  // Build dynamic WHERE clause
  const { whereClause, params, paramIndex } = buildMemberQuery(filters);

  // Count total matching records
  const countResult = await query(
    `SELECT COUNT(*) AS total FROM members ${whereClause}`,
    params
  );
  const total = parseInt(countResult.rows[0].total, 10);

  // Fetch paginated results
  const dataParams = [...params, limit, offset];
  const dataResult = await query(
    `SELECT id, full_name, school, programme, phone, email, is_verified, is_active, created_at, last_login_at
     FROM members
     ${whereClause}
     ORDER BY ${sortBy} ${sortOrder}
     LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
    dataParams
  );

  return {
    members: dataResult.rows,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Get single member by ID (admin view — includes all fields except password)
 */
async function getMemberById(id) {
  const result = await query(
    `SELECT id, full_name, school, programme, phone, email, is_verified, is_active, created_at, updated_at, last_login_at
     FROM members WHERE id = $1`,
    [id]
  );

  if (result.rowCount === 0) {
    throw new AppError('Member not found.', 404);
  }

  return result.rows[0];
}

/**
 * Admin update of member (can change any field except password)
 */
async function updateMember(id, data) {
  const { fullName, school, programme, phone, email, isVerified, isActive } = data;

  // Check phone uniqueness if being changed
  if (phone) {
    const phoneCheck = await query('SELECT id FROM members WHERE phone = $1 AND id != $2', [phone, id]);
    if (phoneCheck.rowCount > 0) {
      throw new AppError('This phone number is already in use by another member.', 409);
    }
  }

  // Check email uniqueness if being changed
  if (email) {
    const emailCheck = await query('SELECT id FROM members WHERE email = $1 AND id != $2', [email, id]);
    if (emailCheck.rowCount > 0) {
      throw new AppError('This email address is already in use by another member.', 409);
    }
  }

  const result = await query(
    `UPDATE members
     SET full_name   = COALESCE($1, full_name),
         school      = COALESCE($2, school),
         programme   = COALESCE($3, programme),
         phone       = COALESCE($4, phone),
         email       = COALESCE($5, email),
         is_verified = COALESCE($6, is_verified),
         is_active   = COALESCE($7, is_active)
     WHERE id = $8
     RETURNING id, full_name, school, programme, phone, email, is_verified, is_active, updated_at`,
    [fullName, school, programme, phone, email, isVerified, isActive, id]
  );

  if (result.rowCount === 0) {
    throw new AppError('Member not found.', 404);
  }

  logger.info(`[MEMBERS] Admin updated member: ${id}`);
  return result.rows[0];
}

/**
 * Toggle member active status
 */
async function toggleStatus(id, isActive) {
  const result = await query(
    'UPDATE members SET is_active = $1 WHERE id = $2 RETURNING id, full_name, is_active',
    [isActive, id]
  );

  if (result.rowCount === 0) {
    throw new AppError('Member not found.', 404);
  }

  const action = isActive ? 'activated' : 'deactivated';
  logger.info(`[MEMBERS] Member ${action}: ${id}`);
  return result.rows[0];
}

/**
 * Delete a member (hard delete)
 */
async function deleteMember(id) {
  const result = await query(
    'DELETE FROM members WHERE id = $1 RETURNING id, full_name',
    [id]
  );

  if (result.rowCount === 0) {
    throw new AppError('Member not found.', 404);
  }

  logger.info(`[MEMBERS] Member deleted: ${id}`);
  return result.rows[0];
}

/**
 * Mark a member as verified (called after OTP verification)
 */
async function markVerified(memberId) {
  await query('UPDATE members SET is_verified = true WHERE id = $1', [memberId]);
  logger.info(`[MEMBERS] Member verified: ${memberId}`);
}

module.exports = {
  // Member-facing
  getProfile,
  updateProfile,
  changePassword,
  // Admin-facing
  getAllMembers,
  getMemberById,
  updateMember,
  toggleStatus,
  deleteMember,
  // Shared
  markVerified,
  buildMemberQuery,
};

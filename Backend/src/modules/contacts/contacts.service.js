/**
 * Contacts Service
 * Handles contact form submissions
 */
const { query } = require('../../config/database');
const { AppError } = require('../../utils/AppError');
const { logger } = require('../../utils/logger');

/**
 * Create a new contact submission (public)
 */
async function createSubmission({ name, email, subject, message }) {
  const result = await query(
    `INSERT INTO contact_submissions (name, email, subject, message)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, subject, created_at`,
    [name, email, subject || null, message]
  );

  logger.info(`[CONTACTS] New submission from ${email}`);
  return result.rows[0];
}

/**
 * Get all submissions with filters and pagination
 */
async function getAllSubmissions(filters = {}) {
  const page = Math.max(1, parseInt(filters.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(filters.limit, 10) || 20));
  const offset = (page - 1) * limit;

  const conditions = [];
  const params = [];
  let paramIndex = 1;

  if (filters.status) {
    conditions.push(`status = $${paramIndex++}`);
    params.push(filters.status);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const countResult = await query(
    `SELECT COUNT(*) AS total FROM contact_submissions ${whereClause}`,
    params
  );
  const total = parseInt(countResult.rows[0].total, 10);

  const dataParams = [...params, limit, offset];
  const dataResult = await query(
    `SELECT id, name, email, subject, message, status, created_at
     FROM contact_submissions
     ${whereClause}
     ORDER BY created_at DESC
     LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
    dataParams
  );

  return {
    submissions: dataResult.rows,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

/**
 * Get single submission
 */
async function getSubmissionById(id) {
  const result = await query(
    'SELECT * FROM contact_submissions WHERE id = $1',
    [id]
  );

  if (result.rowCount === 0) {
    throw new AppError('Submission not found.', 404);
  }

  return result.rows[0];
}

/**
 * Update submission status
 */
async function updateStatus(id, status) {
  const result = await query(
    'UPDATE contact_submissions SET status = $1 WHERE id = $2 RETURNING id, name, status',
    [status, id]
  );

  if (result.rowCount === 0) {
    throw new AppError('Submission not found.', 404);
  }

  logger.info(`[CONTACTS] Submission ${id} status updated to ${status}`);
  return result.rows[0];
}

/**
 * Delete a submission
 */
async function deleteSubmission(id) {
  const result = await query(
    'DELETE FROM contact_submissions WHERE id = $1 RETURNING id, name',
    [id]
  );

  if (result.rowCount === 0) {
    throw new AppError('Submission not found.', 404);
  }

  logger.info(`[CONTACTS] Submission deleted: ${id}`);
  return result.rows[0];
}

module.exports = {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateStatus,
  deleteSubmission,
};

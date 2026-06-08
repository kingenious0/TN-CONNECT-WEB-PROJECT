/**
 * Admins Service
 * Business logic for admin account management and admin login
 */
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { query } = require('../../config/database');
const { generateAccessToken, generateRefreshToken } = require('../../config/jwt');
const { AppError } = require('../../utils/AppError');
const { logger } = require('../../utils/logger');

const SALT_ROUNDS = 12;

/**
 * Admin login — separate from member login
 */
async function adminLogin({ email, password }) {
  const result = await query('SELECT * FROM admins WHERE email = $1', [email]);

  if (result.rowCount === 0) {
    throw new AppError('Invalid credentials.', 401);
  }

  const admin = result.rows[0];

  const isMatch = await bcrypt.compare(password, admin.password_hash);
  if (!isMatch) {
    throw new AppError('Invalid credentials.', 401);
  }

  // Generate tokens with admin role claim
  const jti = uuidv4();
  const tokenPayload = {
    id: admin.id,
    role: admin.role,
    type: 'admin',
    jti,
  };

  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  // Update last_login_at
  await query('UPDATE admins SET last_login_at = NOW() WHERE id = $1', [admin.id]);

  logger.info(`[ADMIN] Admin logged in: ${admin.id} (${admin.role})`);

  return {
    accessToken,
    refreshToken,
    admin: {
      id: admin.id,
      fullName: admin.full_name,
      email: admin.email,
      role: admin.role,
    },
  };
}

/**
 * Create a new admin account (super_admin only)
 */
async function createAdmin({ fullName, email, password, role }) {
  // Check duplicate email
  const emailCheck = await query('SELECT id FROM admins WHERE email = $1', [email]);
  if (emailCheck.rowCount > 0) {
    throw new AppError('An admin with this email already exists.', 409);
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const result = await query(
    `INSERT INTO admins (full_name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, full_name, email, role, created_at`,
    [fullName, email, passwordHash, role || 'admin']
  );

  logger.info(`[ADMIN] New admin created: ${result.rows[0].id} (${role})`);
  return result.rows[0];
}

/**
 * Get all admins
 */
async function getAllAdmins() {
  const result = await query(
    'SELECT id, full_name, email, role, created_at, last_login_at FROM admins ORDER BY created_at DESC'
  );
  return result.rows;
}

/**
 * Get admin by ID
 */
async function getAdminById(id) {
  const result = await query(
    'SELECT id, full_name, email, role, created_at, updated_at, last_login_at FROM admins WHERE id = $1',
    [id]
  );

  if (result.rowCount === 0) {
    throw new AppError('Admin not found.', 404);
  }

  return result.rows[0];
}

/**
 * Update admin (name, email, role)
 */
async function updateAdmin(id, data) {
  const { fullName, email, role } = data;

  // Check email uniqueness
  if (email) {
    const emailCheck = await query('SELECT id FROM admins WHERE email = $1 AND id != $2', [email, id]);
    if (emailCheck.rowCount > 0) {
      throw new AppError('This email is already in use by another admin.', 409);
    }
  }

  const result = await query(
    `UPDATE admins
     SET full_name = COALESCE($1, full_name),
         email     = COALESCE($2, email),
         role      = COALESCE($3, role)
     WHERE id = $4
     RETURNING id, full_name, email, role, updated_at`,
    [fullName, email, role, id]
  );

  if (result.rowCount === 0) {
    throw new AppError('Admin not found.', 404);
  }

  logger.info(`[ADMIN] Admin updated: ${id}`);
  return result.rows[0];
}

/**
 * Delete admin (cannot delete self)
 */
async function deleteAdmin(id, requestingAdminId) {
  if (id === requestingAdminId) {
    throw new AppError('You cannot delete your own account.', 400);
  }

  const result = await query(
    'DELETE FROM admins WHERE id = $1 RETURNING id, full_name',
    [id]
  );

  if (result.rowCount === 0) {
    throw new AppError('Admin not found.', 404);
  }

  logger.info(`[ADMIN] Admin deleted: ${id}`);
  return result.rows[0];
}

module.exports = {
  adminLogin,
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};

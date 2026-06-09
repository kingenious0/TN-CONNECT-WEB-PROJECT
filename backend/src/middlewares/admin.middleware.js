/**
 * Admin Middleware
 * Ensures the authenticated user has admin privileges
 * Must be used AFTER auth.middleware
 *
 * Accepts both 'admin' and 'super_admin' roles
 */
function requireAdmin(req, res, next) {
  const adminRoles = ['admin', 'super_admin'];

  if (!req.user || !adminRoles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.',
    });
  }
  next();
}

module.exports = { requireAdmin };

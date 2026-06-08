/**
 * Admin Middleware
 * Ensures the authenticated user has admin privileges
 * Must be used AFTER auth.middleware
 */
function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.',
    });
  }
  next();
}

module.exports = { requireAdmin };

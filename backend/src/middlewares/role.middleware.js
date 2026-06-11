/**
 * Role-Based Access Control Middleware
 * Restricts routes to users with specific roles
 * Must be used AFTER auth.middleware
 *
 * Usage: authorize('admin', 'super_admin')
 */
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role(s): ${allowedRoles.join(', ')}`,
      });
    }
    next();
  };
}

module.exports = { authorize };

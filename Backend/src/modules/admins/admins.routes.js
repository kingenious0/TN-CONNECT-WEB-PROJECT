/**
 * Admins Routes
 * POST   /api/admin/login    — Admin login (separate from member login)
 * GET    /api/admin/admins   — List all admins (super_admin only)
 * POST   /api/admin/admins   — Create admin (super_admin only)
 * GET    /api/admin/admins/:id    — Get admin
 * PUT    /api/admin/admins/:id    — Update admin
 * DELETE /api/admin/admins/:id    — Delete admin
 */
const express = require('express');
const router = express.Router();

const adminsController = require('./admins.controller');
const { validate } = require('../../middlewares/validation.middleware');
const { authenticate } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');
const { authLimiter } = require('../../middlewares/rateLimit.middleware');
const {
  adminLoginSchema,
  createAdminSchema,
  updateAdminSchema,
} = require('../../validations/admin.validation');

// Public admin login
router.post('/login', authLimiter, validate(adminLoginSchema), adminsController.adminLogin);

// Protected admin management routes (super_admin only)
router.get('/', authenticate, authorize('super_admin'), adminsController.getAllAdmins);
router.post('/', authenticate, authorize('super_admin'), validate(createAdminSchema), adminsController.createAdmin);
router.get('/:id', authenticate, authorize('super_admin'), adminsController.getAdminById);
router.put('/:id', authenticate, authorize('super_admin'), validate(updateAdminSchema), adminsController.updateAdmin);
router.delete('/:id', authenticate, authorize('super_admin'), adminsController.deleteAdmin);

module.exports = router;

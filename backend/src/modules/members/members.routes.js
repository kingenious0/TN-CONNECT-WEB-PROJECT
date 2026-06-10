/**
 * Members Routes
 *
 * Member-facing (own profile):
 *   GET    /api/members/me           — Get own profile
 *   PUT    /api/members/me           — Update own profile
 *   PUT    /api/members/me/password  — Change own password
 *
 * Admin-facing (member management):
 *   GET    /api/admin/members        — List all members (paginated + filtered)
 *   GET    /api/admin/members/:id    — Get single member
 *   PUT    /api/admin/members/:id    — Update member
 *   PATCH  /api/admin/members/:id/status  — Activate/deactivate
 *   DELETE /api/admin/members/:id    — Delete member (super_admin only)
 */
const express = require('express');
const memberRouter = express.Router();
const adminMemberRouter = express.Router();

const membersController = require('./members.controller');
const { validate } = require('../../middlewares/validation.middleware');
const { authenticate } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');
const {
  updateProfileSchema,
  changePasswordSchema,
  adminUpdateMemberSchema,
  toggleStatusSchema,
  memberQuerySchema,
} = require('../../validations/member.validation');

// ──────────────── Member routes ────────────────
memberRouter.get('/me', authenticate, membersController.getProfile);
memberRouter.put('/me', authenticate, validate(updateProfileSchema), membersController.updateProfile);
memberRouter.put('/me/password', authenticate, validate(changePasswordSchema), membersController.changePassword);

// ──────────────── Admin member routes ────────────────
adminMemberRouter.get(
  '/',
  authenticate,
  authorize('admin', 'super_admin'),
  validate(memberQuerySchema, 'query'),
  membersController.getAllMembers
);
adminMemberRouter.get(
  '/:id',
  authenticate,
  authorize('admin', 'super_admin'),
  membersController.getMemberById
);
adminMemberRouter.put(
  '/:id',
  authenticate,
  authorize('admin', 'super_admin'),
  validate(adminUpdateMemberSchema),
  membersController.updateMember
);
adminMemberRouter.patch(
  '/:id/status',
  authenticate,
  authorize('admin', 'super_admin'),
  validate(toggleStatusSchema),
  membersController.toggleStatus
);
adminMemberRouter.delete(
  '/:id',
  authenticate,
  authorize('super_admin'),
  membersController.deleteMember
);

module.exports = { memberRouter, adminMemberRouter };

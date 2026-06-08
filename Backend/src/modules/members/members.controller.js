/**
 * Members Controller
 * Handles HTTP request/response for member operations
 * Split into member-facing and admin-facing handlers
 */
const membersService = require('./members.service');
const { successResponse, paginatedResponse } = require('../../utils/response');

// ──────────────────────────────────────────────
// Member-facing endpoints (/api/members/me/*)
// ──────────────────────────────────────────────

/**
 * GET /api/members/me
 */
async function getProfile(req, res, next) {
  try {
    const member = await membersService.getProfile(req.user.id);
    return successResponse(res, member, 'Profile retrieved successfully.');
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/members/me
 */
async function updateProfile(req, res, next) {
  try {
    const member = await membersService.updateProfile(req.user.id, req.body);
    return successResponse(res, member, 'Profile updated successfully.');
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/members/me/password
 */
async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;
    await membersService.changePassword(req.user.id, currentPassword, newPassword);
    return successResponse(res, null, 'Password changed successfully.');
  } catch (error) {
    next(error);
  }
}

// ──────────────────────────────────────────────
// Admin-facing endpoints (/api/admin/members/*)
// ──────────────────────────────────────────────

/**
 * GET /api/admin/members
 */
async function getAllMembers(req, res, next) {
  try {
    const filters = {
      search: req.query.search,
      school: req.query.school,
      programme: req.query.programme,
      isVerified: req.query.isVerified !== undefined ? req.query.isVerified === 'true' : undefined,
      isActive: req.query.isActive !== undefined ? req.query.isActive === 'true' : undefined,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
      page: req.query.page,
      limit: req.query.limit,
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder,
    };

    const result = await membersService.getAllMembers(filters);
    return paginatedResponse(
      res,
      result.members,
      result.pagination.page,
      result.pagination.limit,
      result.pagination.total
    );
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/admin/members/:id
 */
async function getMemberById(req, res, next) {
  try {
    const member = await membersService.getMemberById(req.params.id);
    return successResponse(res, member, 'Member retrieved successfully.');
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/admin/members/:id
 */
async function updateMember(req, res, next) {
  try {
    const member = await membersService.updateMember(req.params.id, req.body);
    return successResponse(res, member, 'Member updated successfully.');
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/admin/members/:id/status
 */
async function toggleStatus(req, res, next) {
  try {
    const { isActive } = req.body;
    const member = await membersService.toggleStatus(req.params.id, isActive);
    const action = isActive ? 'activated' : 'deactivated';
    return successResponse(res, member, `Member ${action} successfully.`);
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/admin/members/:id
 */
async function deleteMember(req, res, next) {
  try {
    const member = await membersService.deleteMember(req.params.id);
    return successResponse(res, member, 'Member deleted successfully.');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  getAllMembers,
  getMemberById,
  updateMember,
  toggleStatus,
  deleteMember,
};

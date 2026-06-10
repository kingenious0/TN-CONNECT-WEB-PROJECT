/**
 * Admins Controller
 */
const adminsService = require('./admins.service');
const { successResponse } = require('../../utils/response');

async function adminLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await adminsService.adminLogin({ email, password });
    return successResponse(res, result, 'Admin login successful.');
  } catch (error) {
    next(error);
  }
}

async function createAdmin(req, res, next) {
  try {
    const admin = await adminsService.createAdmin(req.body);
    return successResponse(res, admin, 'Admin created successfully.', 201);
  } catch (error) {
    next(error);
  }
}

async function getAllAdmins(req, res, next) {
  try {
    const admins = await adminsService.getAllAdmins();
    return successResponse(res, admins, 'Admins retrieved successfully.');
  } catch (error) {
    next(error);
  }
}

async function getAdminById(req, res, next) {
  try {
    const admin = await adminsService.getAdminById(req.params.id);
    return successResponse(res, admin, 'Admin retrieved successfully.');
  } catch (error) {
    next(error);
  }
}

async function updateAdmin(req, res, next) {
  try {
    const admin = await adminsService.updateAdmin(req.params.id, req.body);
    return successResponse(res, admin, 'Admin updated successfully.');
  } catch (error) {
    next(error);
  }
}

async function deleteAdmin(req, res, next) {
  try {
    const admin = await adminsService.deleteAdmin(req.params.id, req.user.id);
    return successResponse(res, admin, 'Admin deleted successfully.');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  adminLogin,
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};

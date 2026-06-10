/**
 * Auth Controller
 * Handles HTTP request/response for authentication operations
 */
const authService = require('./auth.service');
const { successResponse, errorResponse } = require('../../utils/response');

/**
 * POST /api/auth/register
 */
async function register(req, res, next) {
  try {
    const { fullName, school, programme, phone, email, password } = req.body;
    const member = await authService.register({ fullName, school, programme, phone, email, password });
    return successResponse(res, member, 'Registration successful. Please verify your phone number.', 201);
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/auth/login
 */
async function login(req, res, next) {
  try {
    const { identifier, password, rememberMe } = req.body;
    const result = await authService.login({ identifier, password, rememberMe });
    return successResponse(res, result, 'Login successful.');
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/auth/refresh-token
 */
async function refreshToken(req, res, next) {
  try {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshToken(refreshToken);
    return successResponse(res, tokens, 'Token refreshed successfully.');
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/auth/logout
 */
async function logout(req, res, next) {
  try {
    const { jti, exp } = req.user;
    await authService.logout(jti, exp);
    return successResponse(res, null, 'Logged out successfully.');
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/auth/forgot-password
 */
async function forgotPassword(req, res, next) {
  try {
    const { identifier } = req.body;
    const result = await authService.forgotPassword(identifier);
    // Always return success to prevent user enumeration
    return successResponse(
      res,
      result,
      'If an account with that identifier exists, a reset link has been sent.'
    );
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/auth/reset-password
 */
async function resetPassword(req, res, next) {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);
    return successResponse(res, null, 'Password reset successful. You can now log in with your new password.');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
};

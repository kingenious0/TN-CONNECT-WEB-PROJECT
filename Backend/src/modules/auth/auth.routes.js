/**
 * Auth Routes
 * POST /api/auth/register        — Register new member
 * POST /api/auth/login            — Login
 * POST /api/auth/refresh-token    — Refresh access token
 * POST /api/auth/logout           — Logout (blacklist token)
 * POST /api/auth/forgot-password  — Request password reset
 * POST /api/auth/reset-password   — Reset password with token
 */
const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');
const { validate } = require('../../middlewares/validation.middleware');
const { authenticate } = require('../../middlewares/auth.middleware');
const { authLimiter } = require('../../middlewares/rateLimit.middleware');
const {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require('../../validations/auth.validation');

router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/refresh-token', validate(refreshTokenSchema), authController.refreshToken);
router.post('/logout', authenticate, authController.logout);
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);

module.exports = router;

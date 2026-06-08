/**
 * OTP Routes
 * POST /api/otp/send    — Send OTP
 * POST /api/otp/verify  — Verify OTP
 * POST /api/otp/resend  — Resend OTP
 */
const express = require('express');
const router = express.Router();

const otpController = require('./otp.controller');
const { validate } = require('../../middlewares/validation.middleware');
const { authLimiter } = require('../../middlewares/rateLimit.middleware');
const { sendOtpSchema, verifyOtpSchema, resendOtpSchema } = require('../../validations/otp.validation');

router.post('/send', authLimiter, validate(sendOtpSchema), otpController.sendOTP);
router.post('/verify', authLimiter, validate(verifyOtpSchema), otpController.verifyOTP);
router.post('/resend', authLimiter, validate(resendOtpSchema), otpController.resendOTP);

module.exports = router;

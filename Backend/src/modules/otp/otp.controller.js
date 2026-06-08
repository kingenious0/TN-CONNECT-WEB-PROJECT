/**
 * OTP Controller
 * Handles HTTP request/response for OTP operations
 */
const otpService = require('./otp.service');
const { sendSMS } = require('../../config/sms');
const { successResponse, errorResponse } = require('../../utils/response');
const { logger } = require('../../utils/logger');

/**
 * POST /api/otp/send
 * Send OTP to a phone number
 */
async function sendOTP(req, res, next) {
  try {
    const { phone } = req.body;

    const code = await otpService.generateOTP(phone);

    // Send via SMS (mocked in development)
    try {
      await sendSMS(phone, `Your TN CONNECT verification code is: ${code}. Valid for 5 minutes.`);
    } catch (smsError) {
      logger.error('[OTP] SMS send failed:', smsError.message);
      // In development, continue anyway since SMS is mocked
      if (process.env.NODE_ENV !== 'development') {
        return errorResponse(res, 'Failed to send verification code. Please try again.', 500);
      }
    }

    // In development, include the code in response for testing
    const responseData = process.env.NODE_ENV === 'development' ? { code } : {};

    return successResponse(res, responseData, 'Verification code sent successfully.', 200);
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/otp/verify
 * Verify an OTP code
 */
async function verifyOTP(req, res, next) {
  try {
    const { phone, code } = req.body;

    const result = await otpService.verifyOTP(phone, code);

    if (result.expired) {
      return errorResponse(res, 'Verification code has expired. Please request a new one.', 400);
    }

    if (result.locked) {
      return errorResponse(res, 'Too many failed attempts. Please request a new code.', 429);
    }

    if (!result.valid) {
      return errorResponse(
        res,
        `Invalid verification code. ${result.attemptsRemaining} attempt(s) remaining.`,
        400
      );
    }

    return successResponse(res, { verified: true }, 'Phone number verified successfully.');
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/otp/resend
 * Resend OTP (generates a new code)
 */
async function resendOTP(req, res, next) {
  try {
    const { phone } = req.body;

    const code = await otpService.resendOTP(phone);

    // Send via SMS
    try {
      await sendSMS(phone, `Your new TN CONNECT verification code is: ${code}. Valid for 5 minutes.`);
    } catch (smsError) {
      logger.error('[OTP] SMS resend failed:', smsError.message);
      if (process.env.NODE_ENV !== 'development') {
        return errorResponse(res, 'Failed to resend verification code. Please try again.', 500);
      }
    }

    const responseData = process.env.NODE_ENV === 'development' ? { code } : {};

    return successResponse(res, responseData, 'New verification code sent successfully.', 200);
  } catch (error) {
    next(error);
  }
}

module.exports = { sendOTP, verifyOTP, resendOTP };

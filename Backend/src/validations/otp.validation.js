/**
 * OTP Validation Schemas
 * Joi schemas for OTP endpoints
 */
const Joi = require('joi');

const phoneRegex = /^\+?[1-9]\d{7,14}$/;

const sendOtpSchema = Joi.object({
  phone: Joi.string()
    .pattern(phoneRegex)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be in a valid international format (e.g., +2348012345678).',
      'any.required': 'Phone number is required.',
    }),
});

const verifyOtpSchema = Joi.object({
  phone: Joi.string()
    .pattern(phoneRegex)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be in a valid international format.',
      'any.required': 'Phone number is required.',
    }),
  code: Joi.string()
    .length(6)
    .pattern(/^\d{6}$/)
    .required()
    .messages({
      'string.length': 'Verification code must be exactly 6 digits.',
      'string.pattern.base': 'Verification code must contain only digits.',
      'any.required': 'Verification code is required.',
    }),
});

const resendOtpSchema = Joi.object({
  phone: Joi.string()
    .pattern(phoneRegex)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be in a valid international format.',
      'any.required': 'Phone number is required.',
    }),
});

module.exports = { sendOtpSchema, verifyOtpSchema, resendOtpSchema };

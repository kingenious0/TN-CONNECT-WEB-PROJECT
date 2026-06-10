/**
 * Auth Validation Schemas
 * Joi schemas for auth endpoints
 */
const Joi = require('joi');

const phoneRegex = /^\+?[1-9]\d{7,14}$/;

// Password: min 8 chars, at least 1 uppercase, 1 lowercase, 1 number
const passwordSchema = Joi.string()
  .min(8)
  .max(128)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  .required()
  .messages({
    'string.min': 'Password must be at least 8 characters long.',
    'string.max': 'Password must not exceed 128 characters.',
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
    'any.required': 'Password is required.',
  });

const registerSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(200).required().messages({
    'string.min': 'Full name must be at least 2 characters.',
    'string.max': 'Full name must not exceed 200 characters.',
    'any.required': 'Full name is required.',
  }),
  school: Joi.string().trim().min(2).max(200).required().messages({
    'string.min': 'School name must be at least 2 characters.',
    'any.required': 'School is required.',
  }),
  programme: Joi.string().trim().min(2).max(200).required().messages({
    'string.min': 'Programme must be at least 2 characters.',
    'any.required': 'Programme is required.',
  }),
  phone: Joi.string().pattern(phoneRegex).required().messages({
    'string.pattern.base': 'Phone number must be in a valid international format (e.g., +2348012345678).',
    'any.required': 'Phone number is required.',
  }),
  email: Joi.string().email().lowercase().trim().allow('', null).optional().messages({
    'string.email': 'Please provide a valid email address.',
  }),
  password: passwordSchema,
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match.',
    'any.required': 'Password confirmation is required.',
  }),
});

const loginSchema = Joi.object({
  identifier: Joi.string().trim().required().messages({
    'any.required': 'Phone number or email is required.',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required.',
  }),
  rememberMe: Joi.boolean().default(false),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    'any.required': 'Refresh token is required.',
  }),
});

const forgotPasswordSchema = Joi.object({
  identifier: Joi.string().trim().required().messages({
    'any.required': 'Phone number or email is required.',
  }),
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required().messages({
    'any.required': 'Reset token is required.',
  }),
  newPassword: passwordSchema,
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
    'any.only': 'Passwords do not match.',
    'any.required': 'Password confirmation is required.',
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};

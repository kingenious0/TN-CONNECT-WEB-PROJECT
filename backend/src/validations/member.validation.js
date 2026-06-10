/**
 * Member Validation Schemas
 * Joi schemas for member endpoints
 */
const Joi = require('joi');

const phoneRegex = /^\+?[1-9]\d{7,14}$/;

const passwordSchema = Joi.string()
  .min(8)
  .max(128)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  .messages({
    'string.min': 'Password must be at least 8 characters long.',
    'string.max': 'Password must not exceed 128 characters.',
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  });

/**
 * Member updating own profile
 */
const updateProfileSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(200).optional(),
  school: Joi.string().trim().min(2).max(200).optional(),
  programme: Joi.string().trim().min(2).max(200).optional(),
  email: Joi.string().email().lowercase().trim().allow('', null).optional(),
}).min(1).messages({
  'object.min': 'At least one field must be provided for update.',
});

/**
 * Member changing own password
 */
const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    'any.required': 'Current password is required.',
  }),
  newPassword: passwordSchema.required().messages({
    'any.required': 'New password is required.',
  }),
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
    'any.only': 'Passwords do not match.',
    'any.required': 'Password confirmation is required.',
  }),
});

/**
 * Admin updating a member
 */
const adminUpdateMemberSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(200).optional(),
  school: Joi.string().trim().min(2).max(200).optional(),
  programme: Joi.string().trim().min(2).max(200).optional(),
  phone: Joi.string().pattern(phoneRegex).optional(),
  email: Joi.string().email().lowercase().trim().allow('', null).optional(),
  isVerified: Joi.boolean().optional(),
  isActive: Joi.boolean().optional(),
}).min(1).messages({
  'object.min': 'At least one field must be provided for update.',
});

/**
 * Toggle member status
 */
const toggleStatusSchema = Joi.object({
  isActive: Joi.boolean().required().messages({
    'any.required': 'Active status is required.',
  }),
});

/**
 * Query parameters for member listing
 */
const memberQuerySchema = Joi.object({
  search: Joi.string().trim().max(200).allow('').optional(),
  school: Joi.string().trim().max(200).optional(),
  programme: Joi.string().trim().max(200).optional(),
  isVerified: Joi.string().valid('true', 'false').optional(),
  isActive: Joi.string().valid('true', 'false').optional(),
  dateFrom: Joi.date().iso().optional(),
  dateTo: Joi.date().iso().min(Joi.ref('dateFrom')).optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  sortBy: Joi.string().valid('full_name', 'school', 'programme', 'phone', 'created_at', 'is_verified', 'is_active').default('created_at'),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
});

module.exports = {
  updateProfileSchema,
  changePasswordSchema,
  adminUpdateMemberSchema,
  toggleStatusSchema,
  memberQuerySchema,
};

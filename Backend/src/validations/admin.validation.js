/**
 * Admin Validation Schemas
 */
const Joi = require('joi');

const passwordSchema = Joi.string()
  .min(8)
  .max(128)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  .messages({
    'string.min': 'Password must be at least 8 characters long.',
    'string.max': 'Password must not exceed 128 characters.',
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  });

const adminLoginSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required().messages({
    'string.email': 'Please provide a valid email address.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required.',
  }),
});

const createAdminSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(200).required().messages({
    'any.required': 'Full name is required.',
  }),
  email: Joi.string().email().lowercase().trim().required().messages({
    'any.required': 'Email is required.',
  }),
  password: passwordSchema.required(),
  role: Joi.string().valid('admin', 'super_admin').default('admin').messages({
    'any.only': 'Role must be either "admin" or "super_admin".',
  }),
});

const updateAdminSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(200).optional(),
  email: Joi.string().email().lowercase().trim().optional(),
  role: Joi.string().valid('admin', 'super_admin').optional(),
}).min(1);

module.exports = {
  adminLoginSchema,
  createAdminSchema,
  updateAdminSchema,
};

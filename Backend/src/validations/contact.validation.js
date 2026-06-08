/**
 * Contact Validation Schemas
 */
const Joi = require('joi');

const createContactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(200).required().messages({
    'any.required': 'Name is required.',
    'string.min': 'Name must be at least 2 characters.',
  }),
  email: Joi.string().email().lowercase().trim().required().messages({
    'any.required': 'Email is required.',
    'string.email': 'Please provide a valid email address.',
  }),
  subject: Joi.string().trim().max(300).allow('', null).optional(),
  message: Joi.string().trim().min(10).max(5000).required().messages({
    'any.required': 'Message is required.',
    'string.min': 'Message must be at least 10 characters.',
    'string.max': 'Message must not exceed 5000 characters.',
  }),
});

const updateContactStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'read', 'resolved').required().messages({
    'any.required': 'Status is required.',
    'any.only': 'Status must be one of: pending, read, resolved.',
  }),
});

module.exports = { createContactSchema, updateContactStatusSchema };

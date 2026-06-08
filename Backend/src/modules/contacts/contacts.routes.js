/**
 * Contacts Routes
 * POST   /api/contacts              — Submit contact form (public)
 * GET    /api/contacts              — List all submissions (admin)
 * GET    /api/contacts/:id          — Get single submission (admin)
 * PATCH  /api/contacts/:id/status   — Update status (admin)
 * DELETE /api/contacts/:id          — Delete submission (super_admin)
 */
const express = require('express');
const router = express.Router();

const contactsController = require('./contacts.controller');
const { validate } = require('../../middlewares/validation.middleware');
const { authenticate } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');
const { apiLimiter } = require('../../middlewares/rateLimit.middleware');
const {
  createContactSchema,
  updateContactStatusSchema,
} = require('../../validations/contact.validation');

// Public endpoint (rate limited)
router.post('/', apiLimiter, validate(createContactSchema), contactsController.createSubmission);

// Admin-protected endpoints
router.get('/', authenticate, authorize('admin', 'super_admin'), contactsController.getAllSubmissions);
router.get('/:id', authenticate, authorize('admin', 'super_admin'), contactsController.getSubmissionById);
router.patch('/:id/status', authenticate, authorize('admin', 'super_admin'), validate(updateContactStatusSchema), contactsController.updateStatus);
router.delete('/:id', authenticate, authorize('super_admin'), contactsController.deleteSubmission);

module.exports = router;

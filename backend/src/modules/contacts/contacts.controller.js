/**
 * Contacts Controller
 */
const contactsService = require('./contacts.service');
const { successResponse, paginatedResponse } = require('../../utils/response');

async function createSubmission(req, res, next) {
  try {
    const submission = await contactsService.createSubmission(req.body);
    return successResponse(res, submission, 'Your message has been sent. We will get back to you soon.', 201);
  } catch (error) {
    next(error);
  }
}

async function getAllSubmissions(req, res, next) {
  try {
    const filters = {
      status: req.query.status,
      page: req.query.page,
      limit: req.query.limit,
    };
    const result = await contactsService.getAllSubmissions(filters);
    return paginatedResponse(
      res,
      result.submissions,
      result.pagination.page,
      result.pagination.limit,
      result.pagination.total
    );
  } catch (error) {
    next(error);
  }
}

async function getSubmissionById(req, res, next) {
  try {
    const submission = await contactsService.getSubmissionById(req.params.id);
    return successResponse(res, submission, 'Submission retrieved.');
  } catch (error) {
    next(error);
  }
}

async function updateStatus(req, res, next) {
  try {
    const { status } = req.body;
    const submission = await contactsService.updateStatus(req.params.id, status);
    return successResponse(res, submission, 'Submission status updated.');
  } catch (error) {
    next(error);
  }
}

async function deleteSubmission(req, res, next) {
  try {
    const submission = await contactsService.deleteSubmission(req.params.id);
    return successResponse(res, submission, 'Submission deleted.');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateStatus,
  deleteSubmission,
};

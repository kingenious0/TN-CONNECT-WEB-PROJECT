/**
 * Validation Middleware
 * Uses Joi schemas to validate request body, params, or query
 *
 * Usage: validate(someJoiSchema, 'body')
 */
function validate(schema, source = 'body') {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    // Replace with sanitized values
    req[source] = value;
    next();
  };
}

module.exports = { validate };

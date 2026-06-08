const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { errorHandler, notFound } = require('./middlewares/error.middleware');
const { apiLimiter } = require('./middlewares/rateLimit.middleware');
const routes = require('./routes');

const app = express();

// ──────────────── Security & Parsing ────────────────
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ──────────────── Logging ────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ──────────────── Rate Limiting ────────────────
app.use('/api', apiLimiter);

// ──────────────── API Routes ────────────────
app.use('/api', routes);

// Health check (basic — kept at top level for simplicity)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ──────────────── Swagger Docs (uncomment when ready) ────────────────
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./docs/swagger');
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ──────────────── Error Handling ────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;

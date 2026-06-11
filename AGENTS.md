<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Structure

```
tn-connect-site/
├── src/                 # Next.js frontend (App Router)
│   ├── app/
│   │   ├── (public)/    # Public landing pages — Home, About, Contact, Registration
│   │   ├── (auth)/      # Authentication pages — Login
│   │   ├── layout.js    # Root layout (Navbar + Footer wrapper)
│   │   ├── globals.css  # Global styles
│   │   └── favicon.ico
│   └── components/
│       ├── landing/     # Homepage / landing page components
│       ├── auth/        # Login / registration components
│       ├── Navbar.jsx   # Shared navigation
│       └── Footer.jsx   # Shared footer
├── public/              # Static assets (images, logos)
├── backend/             # Express.js API server
│   ├── src/
│   │   ├── config/      # Database, JWT, mail, Redis, SMS, env configs
│   │   ├── middlewares/  # Auth, admin, error, rate-limit, role, validation
│   │   ├── modules/     # Feature modules (auth, members, contacts, etc.)
│   │   ├── routes/      # API route definitions
│   │   ├── services/    # Business logic services
│   │   ├── utils/       # AppError, logger, response helpers
│   │   ├── validations/ # Request validation schemas (Joi)
│   │   └── jobs/        # Scheduled / background jobs
│   ├── database/
│   │   ├── migrations/  # SQL schema migrations
│   │   └── seeds/       # Seed data
│   └── docs/            # API docs (Swagger)
├── design-mockups/      # HTML/CSS design prototypes (not production code)
│   ├── homepage-admin-dashboard/
│   └── login-redesign-variants/
├── assets/              # Design screenshots, brand assets
├── docs/                # Project documentation (PDFs, workflow guides)
├── scripts/             # Development helper scripts
└── .github/workflows/   # CI/CD pipeline definitions
```

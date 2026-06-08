# TN CONNECT Backend — API & Architecture Documentation

Welcome to the backend service of **TN CONNECT**, a student community membership platform. This service provides a REST API handling authentication, OTP verification, member profiles, admin management, role-based access control, system auditing, analytics, and contact submissions.

It is built on **Node.js** and **Express.js**, using **PostgreSQL** as the primary relational database (interfaced via raw `pg` queries for maximum control and performance) and **Redis** (`ioredis`) for OTP state management, token revocation (blacklisting), and password-reset tracking.

---

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Database Schema & Seed Data](#database-schema--seed-data)
4. [Environment Configuration](#environment-configuration)
5. [Core Architectural Features](#core-architectural-features)
   * 5.1 [OTP Verification & Race Condition Safety](#51-otp-verification--race-condition-safety)
   * 5.2 [Authentication & Session Revocation](#52-authentication--session-revocation)
   * 5.3 [Dynamic Member Query Builder & Exports](#53-dynamic-member-query-builder--exports)
   * 5.4 [Audit Logging (Fire-and-Forget)](#54-audit-logging-fire-and-forget)
   * 5.5 [Role-Based Access Control (RBAC)](#55-role-based-access-control-rbac)
6. [REST API Endpoint Map](#rest-api-endpoint-map)
7. [API Endpoint Reference (Request/Response Shapes)](#api-endpoint-reference-requestresponse-shapes)
8. [Installation & Setup Guide](#installation--setup-guide)
9. [Health Check & System Monitoring](#health-check--system-monitoring)

---

## 1. Tech Stack
* **Language Runtime:** Node.js (v18+)
* **Web Framework:** Express.js
* **Database Driver:** `pg` (node-postgres)
* **In-Memory Store:** Redis (`ioredis`)
* **Cryptography & Hashing:** `bcryptjs` for passwords, Node.js native `crypto` for OTP generation
* **Authentication Tokens:** JSON Web Tokens (`jsonwebtoken`)
* **Validation:** Joi
* **Logging:** Winston + Morgan
* **Export Engine:** ExcelJS

---

## 2. Project Structure
The backend is structured modularly by features under `src/modules`, separated from cross-cutting concerns like middlewares, utils, and configurations:

```text
Backend/
├── database/
│   ├── migrations/
│   │   └── 001_initial_schema.sql  # Database structure, types, indexes, and triggers
│   └── seeds/
│       └── seed.sql                # Default super_admin + development sample members
├── docs/
│   └── swagger.yaml                # API documentation OpenAPI schema stub
├── logs/                           # Auto-generated runtime log files (Winston)
├── src/
│   ├── config/
│   │   ├── database.js             # PostgreSQL client pool configuration & query wrappers
│   │   ├── env.js                  # Centralized, validated environment configuration
│   │   └── redis.js                # Redis client initialization with graceful fallback
│   ├── middlewares/
│   │   ├── admin.middleware.js     # Validates user role is standard admin or super admin
│   │   ├── auth.middleware.js      # Decodes JWT, validates, and checks Redis token blacklist
│   │   ├── error.middleware.js     # Global Express error handler with clean JSON responses
│   │   ├── rateLimiter.middleware.js # API rate limiting using express-rate-limit
│   │   └── validation.middleware.js# Higher-order middleware to run Joi schemas on requests
│   ├── modules/
│   │   ├── admin/                  # Admin account management operations
│   │   ├── auditLogs/              # Read-only audit log viewer
│   │   ├── auth/                   # Registration, login, logout, password resets
│   │   ├── contacts/               # Contact submission forms (public and admin views)
│   │   ├── dashboard/              # Aggregate charts and stat metrics
│   │   ├── exports/                # CSV and Excel data exporters
│   │   ├── health/                 # Health check and infrastructure latency diagnostics
│   │   ├── members/                # Member profile and admin CRUD
│   │   ├── notifications/          # Mail and SMS dispatcher service
│   │   └── otp/                    # OTP generation, storage, and validation
│   ├── routes/
│   │   └── index.js                # Aggregates and mounts all modular sub-routers
│   ├── utils/
│   │   ├── AppError.js             # Custom error class subclassing Error
│   │   ├── auditHelper.js          # Fire-and-forget helper to capture audit logs
│   │   └── logger.js               # Winston logging setup (Console and Files)
│   ├── app.js                      # Express App initialization and middleware mounts
│   └── validations/
│       ├── admin.validation.js     # Joi validation rules for admin actions
│       ├── auth.validation.js      # Joi validation rules for auth and passwords
│       ├── contact.validation.js   # Joi validation rules for contact forms
│       ├── member.validation.js    # Joi validation rules for profiles and listings
│       └── otp.validation.js       # Joi validation rules for OTP requests
├── .env                            # Local environment configurations (ignored by git)
├── .env.example                    # Template for required environment configurations
├── package.json                    # Dependencies and scripts (dev, start)
└── server.js                       # Application entrypoint (binds port, connects services)
```

---

## 3. Database Schema & Seed Data

### 3.1 Initial Migration
The database structure is defined in `database/migrations/001_initial_schema.sql` and consists of 4 main tables:

1. **`members`**: Stores student profile data.
   * `id`: UUID (Primary Key, generated via `uuid-ossp`)
   * `full_name`: VARCHAR(200) (Not Null)
   * `school`: VARCHAR(200) (Not Null, Indexed)
   * `programme`: VARCHAR(200) (Not Null, Indexed)
   * `phone`: VARCHAR(20) (Unique, Not Null, Indexed)
   * `email`: VARCHAR(255) (Unique, Indexed)
   * `password_hash`: VARCHAR(255) (Not Null)
   * `is_verified`: BOOLEAN (Default: `false`, Indexed)
   * `is_active`: BOOLEAN (Default: `true`, Indexed)
   * `created_at`: TIMESTAMPTZ (Default: `NOW()`, Indexed)
   * `updated_at`: TIMESTAMPTZ (Default: `NOW()`, auto-updated on row change)
   * `last_login_at`: TIMESTAMPTZ
   
2. **`admins`**: Stores administrative credentials.
   * `id`: UUID (Primary Key, generated via `uuid-ossp`)
   * `full_name`: VARCHAR(200) (Not Null)
   * `email`: VARCHAR(255) (Unique, Not Null, Indexed)
   * `password_hash`: VARCHAR(255) (Not Null)
   * `role`: ENUM `admin_role` ('super_admin', 'admin') (Default: 'admin', Indexed)
   * `created_at`: TIMESTAMPTZ (Default: `NOW()`)
   * `updated_at`: TIMESTAMPTZ (Default: `NOW()`, auto-updated on row change)
   * `last_login_at`: TIMESTAMPTZ

3. **`audit_logs`**: Immutable, read-only list capturing administrator modifications.
   * `id`: UUID (Primary Key)
   * `admin_id`: UUID (Foreign Key to `admins`, set to NULL if admin is deleted)
   * `action`: VARCHAR(100) (Not Null, Indexed)
   * `target_type`: VARCHAR(50) (e.g. 'member', 'admin')
   * `target_id`: UUID
   * `details`: JSONB (captures changed fields or audit metadata)
   * `ip_address`: VARCHAR(45)
   * `created_at`: TIMESTAMPTZ (Default: `NOW()`, Indexed)

4. **`contact_submissions`**: Public contact form submissions.
   * `id`: UUID (Primary Key)
   * `name`: VARCHAR(200) (Not Null)
   * `email`: VARCHAR(255) (Not Null)
   * `subject`: VARCHAR(300)
   * `message`: TEXT (Not Null)
   * `status`: ENUM `contact_status` ('pending', 'read', 'resolved') (Default: 'pending', Indexed)
   * `created_at`: TIMESTAMPTZ (Default: `NOW()`, Indexed)

### 3.2 Automated Triggers
An automatic trigger is attached to both `members` and `admins` tables to auto-update their `updated_at` timestamps using the `trigger_set_updated_at()` PL/pgSQL function whenever a row is modified:
```sql
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### 3.3 Seeds
Running `database/seeds/seed.sql` populates the database with:
* One default `super_admin` user:
  * **Email**: `admin@tnconnect.com`
  * **Password**: `Admin@2026!`
* Three sample members for testing (two verified, one unverified):
  * **Member 1 (Verified)**: John Doe (`john.doe@example.com`, phone: `+2348012345678`)
  * **Member 2 (Verified)**: Jane Smith (`jane.smith@example.com`, phone: `+2348098765432`)
  * **Member 3 (Unverified)**: Amara Obi (email: `NULL`, phone: `+2348055512345`)

---

## 4. Environment Configuration
The application reads settings from environment variables. A template is located at `.env.example`. 

| Variable | Description | Default Value | Production Recommendation |
|----------|-------------|---------------|---------------------------|
| `NODE_ENV` | Application environment mode | `development` | `production` |
| `PORT` | Local port of the server | `5000` | Any bound port |
| `DATABASE_HOST` | Hostname of the PostgreSQL server | `localhost` | Managed DB Host (RDS/Neon) |
| `DATABASE_PORT` | Port of the PostgreSQL server | `5432` | `5432` |
| `DATABASE_NAME` | PostgreSQL Database name | `tn_connect_db` | Your DB name |
| `DATABASE_USER` | PostgreSQL Username | `postgres` | Restrictive DB role credentials |
| `DATABASE_PASSWORD` | PostgreSQL Password | *Empty* | Strong password |
| `DATABASE_SSL` | Enable SSL DB connection | `false` | `true` |
| `DATABASE_POOL_MIN` | Min active pool connections | `2` | Tuned to hardware size |
| `DATABASE_POOL_MAX` | Max active pool connections | `10` | Tuned to hardware size |
| `REDIS_HOST` | Hostname of the Redis cache | `localhost` | Managed Redis host |
| `REDIS_PORT` | Port of the Redis cache | `6379` | `6379` |
| `REDIS_PASSWORD` | Password of the Redis cache | *Empty* | Strong password |
| `REDIS_DB` | Active Redis DB Index | `0` | `0` |
| `JWT_ACCESS_SECRET` | Secret key to sign Access tokens | *Required* | Strong, random string |
| `JWT_REFRESH_SECRET` | Secret key to sign Refresh tokens | *Required* | Strong, random string |
| `JWT_ACCESS_EXPIRES_IN` | Lifespan of Access tokens | `15m` | `15m` |
| `JWT_REFRESH_EXPIRES_IN`| Lifespan of Refresh tokens | `7d` | `7d` |
| `OTP_EXPIRY_SECONDS` | Lifespan of generated OTP code | `300` (5 minutes) | `300` |
| `OTP_MAX_ATTEMPTS` | Max incorrect guesses permitted | `5` | `5` |
| `ADMIN_SESSION_EXPIRES_IN`| Admin authentication expiry | `1h` | `1h` |
| `SMS_PROVIDER` | Active SMS Driver (`africas_talking`) | `africas_talking` | `africas_talking` |
| `SMS_API_KEY` | Credentials for the SMS provider | *Empty* | Real provider key |
| `SMS_USERNAME` | Username for the SMS provider | *Empty* | Real username |
| `SMS_SENDER_ID` | Approved Sender ID for SMS texts | `TNCONNECT` | Registered Sender ID |
| `MAIL_HOST` | SMTP Host for Email notifications | `smtp.gmail.com` | Verified ESP (SendGrid/Mailgun)|
| `MAIL_PORT` | SMTP Port | `587` | `587` or `465` |
| `MAIL_USER` | SMTP Username | *Empty* | System Email username |
| `MAIL_PASSWORD` | SMTP Password / App Password | *Empty* | Secure credential |
| `MAIL_FROM` | Default "From" display name | `TN Connect <noreply...>`| Same as verified domain |
| `RATE_LIMIT_WINDOW_MS`| Rate Limiting duration | `900000` (15 mins) | `900000` |
| `RATE_LIMIT_MAX_REQUESTS`| Max requests per window | `100` | `100` |
| `LOG_LEVEL` | Minimum log severity to capture | `debug` | `info` or `warn` |

---

## 5. Core Architectural Features

### 5.1 OTP Verification & Race Condition Safety
The OTP service is backed entirely by Redis hashes using the key format `otp:{phone}`:
* Stores two hash fields: `code` (the 6-digit numeric string) and `attempts` (number of verification attempts).
* Each generated OTP has an automatic TTL (default 300 seconds), removing stale codes automatically.

#### Race Condition Prevention
A naive verification implementation checks the attempts count first, and if valid, proceeds to check the code. Under high concurrency, an attacker can dispatch many concurrent requests:
1. All concurrent threads check attempts count simultaneously (e.g. `attempts = 4`).
2. All threads pass the limit checks (`4 < 5`).
3. All threads run the code validation checks, effectively bypassing the limit.

**TN CONNECT solves this by executing `HINCRBY attempts 1` before performing any assertions**:
```javascript
// Check if OTP exists
const exists = await redis.exists(key);
if (!exists) return { valid: false, expired: true };

// Increment attempts BEFORE checking code to lock the attempt slot
const attempts = await redis.hincrby(key, 'attempts', 1);

// Immediately check lockout threshold
if (attempts > OTP_MAX_ATTEMPTS) {
  await redis.del(key); // Hard delete to invalidate entirely
  return { valid: false, locked: true };
}

// Proceed to check the code
const storedCode = await redis.hget(key, 'code');
if (storedCode === code) {
  await redis.del(key); // Cleanup code on success
  return { valid: true };
}
```

### 5.2 Authentication & Session Revocation
The service uses a standard dual-token model:
1. **Access Token**: Short-lived (default 15 minutes) signed JWT used to authenticate every individual request.
2. **Refresh Token**: Long-lived (default 7 days) signed JWT used to request a new access token without re-authenticating.

#### Claims Layout:
* Admins: `{ id: adminId, role: 'super_admin'|'admin', type: 'admin', jti: uuid }`
* Members: `{ id: memberId, type: 'member', jti: uuid }`

#### Session Revocation via Redis Blacklist
To ensure tokens can be immediate invalidated on logout (and not wait 15 minutes for expiration):
* Every token is generated with a unique identifier (`jti` - JSON Web Token ID).
* On calling `/api/auth/logout`, the server extracts the `jti` and calculated time-to-live (`exp - now`).
* It logs `blacklist:${jti}` as a key in Redis with a TTL matching the remainder of the token's lifespan.
* The `auth.middleware.js` checks Redis for the key on every request. If present, it rejects the request as unauthorized, ensuring instantaneous revocation.

### 5.3 Dynamic Member Query Builder & Exports
Admin interfaces require searching members across multiple dynamic dimensions (verification status, account status, course, school, registration dates) along with sorting and pagination.

Instead of writing complex nested `if-else` clauses that are prone to SQL injection and duplication, the system employs a parameter-safe query builder (`buildMemberQuery`):
* Accepts a `filters` object.
* Appends strings to a `conditions` array and matching values to a `params` array.
* Dynamically updates the placeholder index parameter (`$1`, `$2`, etc.).
* Combines them into a single string (`WHERE filter1 = $1 AND filter2 = $2`).

This function is directly shared between:
1. `members.service.js` (for paginated admin UI list queries)
2. `exports.service.js` (for full unpaginated CSV or styled Excel workbook generations matching the active admin filters)

### 5.4 Audit Logging (Fire-and-Forget)
Administrators must have all modifications tracked. To prevent audit-log insertion failures (like primary key exhaustion or table locks) from failing the actual user operation (e.g. activating a user):
* The audit logger runs in a **fire-and-forget** wrapper.
* Any database exceptions during audit logging are caught, logged in detail to stdout/Winston logs, but **never thrown** to block the caller.
* A helper wrapper `auditHelper.js` extracts details from Express request objects (`req.ip`, `req.admin.id`) automatically to minimize controller boilerplate.

### 5.5 Role-Based Access Control (RBAC)
Routes are protected by a chain of validation middlewares:
1. **`authMiddleware`**: Decodes token, validates signatures, ensures `jti` is not blacklisted.
2. **`adminMiddleware`**: Asserts that decoded payload contains type `'admin'` and a valid role. Accepts both `admin` and `super_admin`.
3. **Route inline checks / Parameterized middlewares**: Enforce actions restricted to `super_admin` only (like deleting accounts or managing other admins).

---

## 6. REST API Endpoint Map

Below is a consolidated map of the available REST API endpoints:

```text
========================================================================================================
Path                               Method   Auth Req.       Role Req.         Description
========================================================================================================
/api/health                        GET      Public          -                 Basic ping
/api/health/detailed               GET      Public          -                 Checks DB & Redis latencies
--------------------------------------------------------------------------------------------------------
/api/auth/register                 POST     Public          -                 Register member (Unverified)
/api/auth/login                    POST     Public          -                 Authenticate member
/api/auth/logout                   POST     Authenticated   Member / Admin    Invalidate JWT session
/api/auth/refresh-token            POST     Public          -                 Rotate access token
/api/auth/forgot-password          POST     Public          -                 Initiate password reset
/api/auth/reset-password           POST     Public          -                 Complete password reset
--------------------------------------------------------------------------------------------------------
/api/otp/send                      POST     Public          -                 Send 6-digit verification code
/api/otp/verify                    POST     Public          -                 Submit & verify OTP code
/api/otp/resend                    POST     Public          -                 Resend code (invalidates old)
--------------------------------------------------------------------------------------------------------
/api/members/me                    GET      Authenticated   Member            Read own profile details
/api/members/me                    PUT      Authenticated   Member            Update profile (phone locked)
/api/members/me/password           PUT      Authenticated   Member            Update password (req current)
--------------------------------------------------------------------------------------------------------
/api/admin/login                   POST     Public          -                 Authenticate administrator
/api/admin/dashboard/stats         GET      Authenticated   Admin/SuperAdmin  Total registered stats
/api/admin/dashboard/recent        GET      Authenticated   Admin/SuperAdmin  Feed of recent registrations
--------------------------------------------------------------------------------------------------------
/api/admin/members                 GET      Authenticated   Admin/SuperAdmin  Query paginated members list
/api/admin/members/:id             GET      Authenticated   Admin/SuperAdmin  Read full member details
/api/admin/members/:id             PUT      Authenticated   Admin/SuperAdmin  Modify member details
/api/admin/members/:id/status      PATCH    Authenticated   Admin/SuperAdmin  Toggle member active state
/api/admin/members/:id             DELETE   Authenticated   SuperAdmin Only   Hard delete member
--------------------------------------------------------------------------------------------------------
/api/admin/exports/members         GET      Authenticated   Admin/SuperAdmin  Download members (Excel/CSV)
--------------------------------------------------------------------------------------------------------
/api/contacts                      POST     Public          -                 Submit support message
/api/admin/contacts                GET      Authenticated   Admin/SuperAdmin  List submissions (paginated)
/api/admin/contacts/:id            GET      Authenticated   Admin/SuperAdmin  View single message details
/api/admin/contacts/:id/status     PATCH    Authenticated   Admin/SuperAdmin  Update status (e.g., resolved)
/api/admin/contacts/:id            DELETE   Authenticated   SuperAdmin Only   Hard delete message submission
--------------------------------------------------------------------------------------------------------
/api/admin/notifications/send      POST     Authenticated   Admin/SuperAdmin  Broadcast SMS or Mail
--------------------------------------------------------------------------------------------------------
/api/admin/admins                  GET      Authenticated   SuperAdmin Only   List all admin accounts
/api/admin/admins                  POST     Authenticated   SuperAdmin Only   Create new admin user
/api/admin/admins/:id              GET      Authenticated   SuperAdmin Only   Read admin details
/api/admin/admins/:id              PUT      Authenticated   SuperAdmin Only   Update admin details
/api/admin/admins/:id              DELETE   Authenticated   SuperAdmin Only   Delete admin account
--------------------------------------------------------------------------------------------------------
/api/admin/audit-logs              GET      Authenticated   SuperAdmin Only   View system audit history
========================================================================================================
```

---

## 7. API Endpoint Reference (Request/Response Shapes)

### 7.1 Public & Authentication Endpoints

#### POST `/api/auth/register`
Creates an unverified member. Validates strength of password (min 8 characters, at least 1 uppercase, 1 lowercase, and 1 numeric character).
* **Body**:
  ```json
  {
    "fullName": "Jane Doe",
    "school": "University of Lagos",
    "programme": "Computer Science",
    "phone": "+2348012345678",
    "email": "jane.doe@example.com",
    "password": "Password123!"
  }
  ```
* **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Registration successful. Please verify your phone number.",
    "data": {
      "id": "e9a66d03-e8a0-47b8-80f4-fb31eb18be9d",
      "fullName": "Jane Doe",
      "phone": "+2348012345678",
      "isVerified": false,
      "isActive": true
    }
  }
  ```

#### POST `/api/auth/login`
Authenticates a member using email or phone number.
* **Body**:
  ```json
  {
    "username": "+2348012345678",
    "password": "Password123!"
  }
  ```
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Login successful.",
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "member": {
        "id": "e9a66d03-e8a0-47b8-80f4-fb31eb18be9d",
        "fullName": "Jane Doe",
        "email": "jane.doe@example.com",
        "phone": "+2348012345678",
        "isVerified": true,
        "isActive": true
      }
    }
  }
  ```

#### POST `/api/auth/refresh-token`
Generates a new access token from a valid refresh token.
* **Body**:
  ```json
  {
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

#### POST `/api/otp/send`
Generates a 6-digit OTP code, stores it in Redis under `otp:{phone}` (TTL 300s), and dispatches it. In development mode (`NODE_ENV=development`), the generated code is returned in the response payload for testing convenience.
* **Body**:
  ```json
  {
    "phone": "+2348012345678"
  }
  ```
* **Success Response (200 OK - Development Mode)**:
  ```json
  {
    "success": true,
    "message": "OTP sent successfully (Development Mode).",
    "data": {
      "phone": "+2348012345678",
      "code": "824915"
    }
  }
  ```

#### POST `/api/otp/verify`
Submits an OTP code. If correct, sets `is_verified` to `true` for the associated member profile in the database.
* **Body**:
  ```json
  {
    "phone": "+2348012345678",
    "code": "824915"
  }
  ```
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Phone number verified successfully."
  }
  ```
* **Error Response (400 Bad Request - Incorrect Code)**:
  ```json
  {
    "success": false,
    "message": "Invalid OTP code. 4 attempts remaining."
  }
  ```
* **Error Response (429 Too Many Requests - Locked Out)**:
  ```json
  {
    "success": false,
    "message": "Too many failed attempts. Verification locked."
  }
  ```

#### POST `/api/contacts`
Allows anonymous users to submit feedback or support messages. Rate-limited to prevent abuse.
* **Body**:
  ```json
  {
    "name": "Alex Johnson",
    "email": "alex.j@example.com",
    "subject": "Inquiry about registration",
    "message": "Hello, I am having trouble receiving the SMS verification code."
  }
  ```
* **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Contact form submitted successfully."
  }
  ```

---

### 7.2 Member Portal Protected Endpoints
*All routes in this category require a Bearer Access Token passed in the `Authorization` header:*
`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

#### GET `/api/members/me`
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "e9a66d03-e8a0-47b8-80f4-fb31eb18be9d",
      "fullName": "Jane Doe",
      "school": "University of Lagos",
      "programme": "Computer Science",
      "phone": "+2348012345678",
      "email": "jane.doe@example.com",
      "isVerified": true,
      "isActive": true,
      "createdAt": "2026-06-08T16:00:00.000Z",
      "updatedAt": "2026-06-08T16:15:00.000Z",
      "lastLoginAt": "2026-06-08T16:20:00.000Z"
    }
  }
  ```

#### PUT `/api/members/me`
Updates profile details. Phone number remains locked.
* **Body**:
  ```json
  {
    "fullName": "Jane Smith Doe",
    "school": "University of Ibadan",
    "programme": "Software Engineering",
    "email": "jane.smith.doe@example.com"
  }
  ```
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Profile updated successfully.",
    "data": {
      "id": "e9a66d03-e8a0-47b8-80f4-fb31eb18be9d",
      "fullName": "Jane Smith Doe",
      "school": "University of Ibadan",
      "programme": "Software Engineering",
      "phone": "+2348012345678",
      "email": "jane.smith.doe@example.com",
      "isVerified": true,
      "isActive": true
    }
  }
  ```

---

### 7.3 Admin Protected Endpoints
*All routes in this category require a Bearer Access Token with role `admin` or `super_admin` in JWT claims.*

#### POST `/api/admin/login`
Authenticates administrative personnel.
* **Body**:
  ```json
  {
    "email": "admin@tnconnect.com",
    "password": "Admin@2026!"
  }
  ```
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Admin login successful.",
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "admin": {
        "id": "f5e93df0-d6cc-46b7-90c0-111122223333",
        "fullName": "Super Admin",
        "email": "admin@tnconnect.com",
        "role": "super_admin"
      }
    }
  }
  ```

#### GET `/api/admin/dashboard/stats`
Computes active platform telemetry in a single, high-performance query utilizing SQL filter aggregates.
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "totalMembers": 1250,
      "verifiedMembers": 1100,
      "activeMembers": 1220,
      "recentMembersCount": 45
    }
  }
  ```

#### GET `/api/admin/members`
Lists, pages, sorts, and filters the entire member registration catalog.
* **Query Parameters**:
  * `page`: Page index (default: `1`)
  * `limit`: Items per page (default: `20`, max `100`)
  * `search`: Free text fuzzy search matching `full_name`, `phone`, or `email`
  * `school`: Exact filter by school name
  * `programme`: Exact filter by course/programme name
  * `isVerified`: Boolean string (`"true"`/`"false"`)
  * `isActive`: Boolean string (`"true"`/`"false"`)
  * `dateFrom`: ISO-8601 creation start threshold (e.g. `2026-06-01T00:00:00.000Z`)
  * `dateTo`: ISO-8601 creation end threshold (e.g. `2026-06-30T23:59:59.000Z`)
  * `sortBy`: Sort field (e.g. `created_at`, `full_name`, `school`)
  * `sortOrder`: Sort direction (`"asc"` / `"desc"`)
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "e9a66d03-e8a0-47b8-80f4-fb31eb18be9d",
        "fullName": "Jane Doe",
        "school": "University of Lagos",
        "programme": "Computer Science",
        "phone": "+2348012345678",
        "email": "jane.doe@example.com",
        "isVerified": true,
        "isActive": true,
        "createdAt": "2026-06-08T16:00:00.000Z",
        "lastLoginAt": "2026-06-08T16:20:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1,
      "totalPages": 1
    }
  }
  ```

#### PATCH `/api/admin/members/:id/status`
Toggles active state. Non-active members are rejected from logging in.
* **Body**:
  ```json
  {
    "isActive": false
  }
  ```
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Member status updated successfully.",
    "data": {
      "id": "e9a66d03-e8a0-47b8-80f4-fb31eb18be9d",
      "fullName": "Jane Doe",
      "isActive": false
    }
  }
  ```

#### GET `/api/admin/exports/members`
Streams back CSV or Excel binaries generated matching active filters.
* **Query Parameters**:
  * *Accepts all filters from `/api/admin/members` (search, school, isVerified, etc.)*
  * `format`: Exporter type, either `"csv"` or `"excel"` (default: `csv`)
* **Headers returned (Excel)**:
  * `Content-Type`: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
  * `Content-Disposition`: `attachment; filename=tn-connect-members-2026-06-08.xlsx`

---

### 7.4 Super Admin Restricted Endpoints
*All routes in this category require a Bearer Access Token with role exact match: `super_admin`.*

#### DELETE `/api/admin/members/:id`
Hard deletes a member profile.
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Member record hard deleted successfully.",
    "data": {
      "id": "e9a66d03-e8a0-47b8-80f4-fb31eb18be9d",
      "fullName": "Jane Doe"
    }
  }
  ```

#### POST `/api/admin/admins`
Registers another admin account.
* **Body**:
  ```json
  {
    "fullName": "Marcus Aurelius",
    "email": "marcus@tnconnect.com",
    "password": "SecurePassword123!",
    "role": "admin"
  }
  ```
* **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Admin account created successfully.",
    "data": {
      "id": "784910cf-2cb6-419b-b0b2-9cb1efc4ffaa",
      "fullName": "Marcus Aurelius",
      "email": "marcus@tnconnect.com",
      "role": "admin"
    }
  }
  ```

#### GET `/api/admin/audit-logs`
Retrieves immutable admin audit records.
* **Query Parameters**:
  * `page`, `limit` (For pagination)
  * `adminId`: Filter actions performed by a specific admin UUID.
  * `action`: Exact string match for action names (e.g. `MEMBER_DELETE`, `ADMIN_CREATE`).
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "d0ff10a8-b9a3-41bb-a5a4-1a2211993344",
        "adminId": "f5e93df0-d6cc-46b7-90c0-111122223333",
        "adminName": "Super Admin",
        "action": "MEMBER_DELETE",
        "targetType": "member",
        "targetId": "e9a66d03-e8a0-47b8-80f4-fb31eb18be9d",
        "details": {
          "deletedMemberName": "Jane Doe"
        },
        "ipAddress": "127.0.0.1",
        "createdAt": "2026-06-08T16:20:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1,
      "totalPages": 1
    }
  }
  ```

---

## 8. Installation & Setup Guide

### 8.1 Prerequisites
* Install [Node.js](https://nodejs.org/) (v18.0.0 or higher)
* Install [PostgreSQL](https://www.postgresql.org/) (v14 or higher)
* Install [Redis](https://redis.io/) (v6 or higher)

### 8.2 Installation Steps
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Copy the template configuration file:
   ```bash
   cp .env.example .env
   ```
4. Open the `.env` file and populate it with your local credentials, passwords, and security secrets.

### 8.3 Database Setup
1. Create a blank database in PostgreSQL (e.g., using `psql` or `pgAdmin`):
   ```sql
   CREATE DATABASE tn_connect_db;
   ```
2. Run the migration script to construct the initial schema:
   ```bash
   psql -U postgres -d tn_connect_db -f database/migrations/001_initial_schema.sql
   ```
3. Load the seed script to create test members and the default super-admin account:
   ```bash
   psql -U postgres -d tn_connect_db -f database/seeds/seed.sql
   ```

### 8.4 Starting the Server
* To start in **Development Mode** (auto-reloads on file edits using `nodemon`):
  ```bash
   npm run dev
   ```
* To start in **Production Mode**:
  ```bash
   npm run start
   ```

---

## 9. Health Check & System Monitoring

The application exposes two health check endpoints to monitor the state of the backend service and its upstream resource dependencies:

### 9.1 Basic Ping: GET `/api/health`
Checks whether the Express web application process is running and accepting requests.
* **Success Response (200 OK)**:
  ```json
  {
    "status": "ok",
    "timestamp": "2026-06-08T16:25:00.000Z",
    "uptime": 254.32
  }
  ```

### 9.2 Detailed Health Diagnostics: GET `/api/health/detailed`
Validates full connectivity and monitors response latencies for both PostgreSQL and Redis databases.
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "status": "healthy",
    "timestamp": "2026-06-08T16:25:00.000Z",
    "services": {
      "database": {
        "status": "up",
        "latencyMs": 8
      },
      "redis": {
        "status": "up",
        "latencyMs": 3
      }
    }
  }
  ```
* **Degraded Response (503 Service Unavailable)**:
  If any database query fails or times out, the endpoint immediately returns status code `503`:
  ```json
  {
    "success": false,
    "status": "unhealthy",
    "timestamp": "2026-06-08T16:25:00.000Z",
    "services": {
      "database": {
        "status": "down",
        "error": "connect ECONNREFUSED 127.0.0.1:5432"
      },
      "redis": {
        "status": "up",
        "latencyMs": 2
      }
    }
  }
  ```

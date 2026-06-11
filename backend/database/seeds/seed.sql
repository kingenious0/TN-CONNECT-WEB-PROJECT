-- ============================================
-- TN Connect — Seed Data
-- PostgreSQL Seed: seed.sql
-- ============================================
-- Run: psql -U postgres -d tn_connect_db -f database/seeds/seed.sql
--
-- Default super_admin credentials:
--   Email:    admin@tnconnect.com
--   Password: Admin@2026!
--
-- The password hash below is bcrypt with 12 rounds for "Admin@2026!"

INSERT INTO admins (full_name, email, password_hash, role)
VALUES (
  'Super Admin',
  'admin@tnconnect.com',
  '$2a$12$LJ3m4ys5Rq0Bbv.qF8S1/.Q8rC0F4n6vB7Vy5oGp8hK1w3x9ZjXGy',
  'super_admin'
) ON CONFLICT (email) DO NOTHING;

-- Sample members for development testing
INSERT INTO members (full_name, school, programme, phone, email, password_hash, is_verified, is_active)
VALUES
  (
    'John Doe',
    'University of Lagos',
    'Computer Science',
    '+2348012345678',
    'john.doe@example.com',
    '$2a$12$LJ3m4ys5Rq0Bbv.qF8S1/.Q8rC0F4n6vB7Vy5oGp8hK1w3x9ZjXGy',
    true,
    true
  ),
  (
    'Jane Smith',
    'Covenant University',
    'Information Technology',
    '+2348098765432',
    'jane.smith@example.com',
    '$2a$12$LJ3m4ys5Rq0Bbv.qF8S1/.Q8rC0F4n6vB7Vy5oGp8hK1w3x9ZjXGy',
    true,
    true
  ),
  (
    'Amara Obi',
    'University of Ibadan',
    'Electrical Engineering',
    '+2348055512345',
    NULL,
    '$2a$12$LJ3m4ys5Rq0Bbv.qF8S1/.Q8rC0F4n6vB7Vy5oGp8hK1w3x9ZjXGy',
    false,
    true
  )
ON CONFLICT (phone) DO NOTHING;

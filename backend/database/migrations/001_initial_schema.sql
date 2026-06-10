-- ============================================
-- TN Connect — Initial Database Schema
-- PostgreSQL Migration: 001_initial_schema.sql
-- ============================================
-- Run this against your PostgreSQL database:
--   psql -U postgres -d tn_connect_db -f database/migrations/001_initial_schema.sql

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Custom ENUM types
-- ============================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'admin_role') THEN
    CREATE TYPE admin_role AS ENUM ('super_admin', 'admin');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'contact_status') THEN
    CREATE TYPE contact_status AS ENUM ('pending', 'read', 'resolved');
  END IF;
END
$$;

-- ============================================
-- Auto-update trigger function for updated_at
-- ============================================
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- MEMBERS table
-- ============================================
CREATE TABLE IF NOT EXISTS members (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name     VARCHAR(200)  NOT NULL,
  school        VARCHAR(200)  NOT NULL,
  programme     VARCHAR(200)  NOT NULL,
  phone         VARCHAR(20)   NOT NULL UNIQUE,
  email         VARCHAR(255)  UNIQUE,
  password_hash VARCHAR(255)  NOT NULL,
  is_verified   BOOLEAN       NOT NULL DEFAULT false,
  is_active     BOOLEAN       NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_members_phone       ON members (phone);
CREATE INDEX IF NOT EXISTS idx_members_email       ON members (email);
CREATE INDEX IF NOT EXISTS idx_members_school      ON members (school);
CREATE INDEX IF NOT EXISTS idx_members_programme   ON members (programme);
CREATE INDEX IF NOT EXISTS idx_members_is_verified ON members (is_verified);
CREATE INDEX IF NOT EXISTS idx_members_is_active   ON members (is_active);
CREATE INDEX IF NOT EXISTS idx_members_created_at  ON members (created_at);

-- Auto-update trigger
DROP TRIGGER IF EXISTS set_members_updated_at ON members;
CREATE TRIGGER set_members_updated_at
  BEFORE UPDATE ON members
  FOR EACH ROW
  EXECUTE FUNCTION trigger_set_updated_at();

-- ============================================
-- ADMINS table
-- ============================================
CREATE TABLE IF NOT EXISTS admins (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name     VARCHAR(200)  NOT NULL,
  email         VARCHAR(255)  NOT NULL UNIQUE,
  password_hash VARCHAR(255)  NOT NULL,
  role          admin_role    NOT NULL DEFAULT 'admin',
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_admins_email ON admins (email);
CREATE INDEX IF NOT EXISTS idx_admins_role  ON admins (role);

-- Auto-update trigger
DROP TRIGGER IF EXISTS set_admins_updated_at ON admins;
CREATE TRIGGER set_admins_updated_at
  BEFORE UPDATE ON admins
  FOR EACH ROW
  EXECUTE FUNCTION trigger_set_updated_at();

-- ============================================
-- AUDIT_LOGS table
-- ============================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id    UUID          REFERENCES admins(id) ON DELETE SET NULL,
  action      VARCHAR(100)  NOT NULL,
  target_type VARCHAR(50),
  target_id   UUID,
  details     JSONB,
  ip_address  VARCHAR(45),
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_admin_id   ON audit_logs (admin_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action     ON audit_logs (action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs (created_at);

-- ============================================
-- CONTACT_SUBMISSIONS table
-- ============================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       VARCHAR(200)   NOT NULL,
  email      VARCHAR(255)   NOT NULL,
  subject    VARCHAR(300),
  message    TEXT           NOT NULL,
  status     contact_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status     ON contact_submissions (status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions (created_at);

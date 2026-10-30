-- ==========================================================
-- Migration 0003: Announcement States Schema
-- Tracks one-time announcement views and dismissals per user / persistent guest session
-- Safe & Idempotent (CREATE TABLE IF NOT EXISTS / CREATE INDEX IF NOT EXISTS)
-- ==========================================================

CREATE TABLE IF NOT EXISTS announcement_states (
  id TEXT PRIMARY KEY,
  identity_type TEXT NOT NULL CHECK(identity_type IN ('user', 'guest')),
  identity_id TEXT NOT NULL,
  announcement_key TEXT NOT NULL,
  shown_at TEXT,
  dismissed_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(announcement_key, identity_type, identity_id)
);

CREATE INDEX IF NOT EXISTS idx_announcement_lookup ON announcement_states(announcement_key, identity_type, identity_id);
CREATE INDEX IF NOT EXISTS idx_announcement_identity ON announcement_states(identity_id);
CREATE INDEX IF NOT EXISTS idx_announcement_key ON announcement_states(announcement_key);

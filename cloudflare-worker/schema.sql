-- D1 Schema for d4e.ai Analytics & DIAD Pilot Registration Capture

CREATE TABLE IF NOT EXISTS pilot_registrations (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  full_name TEXT NOT NULL,
  brand_name TEXT NOT NULL,
  work_email TEXT NOT NULL,
  store_url TEXT NOT NULL,
  has_logo INTEGER NOT NULL DEFAULT 0,
  logo_r2_key TEXT,
  logo_filename TEXT,
  logo_mime TEXT,
  logo_size_bytes INTEGER,
  consent_accepted INTEGER NOT NULL DEFAULT 1,
  session_id TEXT,
  visitor_id TEXT,
  utm_json TEXT,
  referrer TEXT,
  landing_page TEXT,
  country TEXT,
  city TEXT,
  region TEXT,
  ip_hash TEXT,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_pilot_created ON pilot_registrations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pilot_email ON pilot_registrations (work_email);
CREATE INDEX IF NOT EXISTS idx_pilot_session ON pilot_registrations (session_id);

CREATE TABLE IF NOT EXISTS sessions (
  session_id TEXT PRIMARY KEY,
  visitor_id TEXT NOT NULL,
  started_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  landing_page TEXT,
  exit_page TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ref_tag TEXT,
  country TEXT,
  city TEXT,
  region TEXT,
  timezone TEXT,
  device_type TEXT,
  viewport TEXT,
  total_stay_sec REAL NOT NULL DEFAULT 0,
  total_active_sec REAL NOT NULL DEFAULT 0,
  total_idle_sec REAL NOT NULL DEFAULT 0,
  max_scroll_percent INTEGER NOT NULL DEFAULT 0,
  last_section_seen TEXT,
  sections_viewed_json TEXT,
  pages_visited_json TEXT,
  videos_watched_json TEXT,
  modal_opened INTEGER NOT NULL DEFAULT 0,
  modal_abandoned_field TEXT,
  converted INTEGER NOT NULL DEFAULT 0,
  pilot_email TEXT,
  lead_name TEXT,
  lead_brand TEXT
);

CREATE INDEX IF NOT EXISTS idx_sessions_last_seen ON sessions (last_seen_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_visitor ON sessions (visitor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_converted ON sessions (converted, last_seen_at DESC);

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL,
  session_id TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  page_path TEXT,
  section_name TEXT,
  active_sec REAL,
  total_sec REAL,
  payload_json TEXT,
  country TEXT,
  city TEXT
);

CREATE INDEX IF NOT EXISTS idx_events_session ON events (session_id, id ASC);
CREATE INDEX IF NOT EXISTS idx_events_name_created ON events (event_name, created_at DESC);

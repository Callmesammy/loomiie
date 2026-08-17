-- Cloudflare D1 Database Schema for LOOMIE Studio
-- Execute via Wrangler CLI: npx wrangler d1 execute loomie_db --file=./db/schema.sql

CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  month TEXT NOT NULL,
  day INTEGER NOT NULL,
  time_slot TEXT NOT NULL,
  timezone TEXT NOT NULL,
  name TEXT,
  email TEXT NOT NULL,
  status TEXT DEFAULT 'confirmed',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  services TEXT NOT NULL,
  budget TEXT,
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

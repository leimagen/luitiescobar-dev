-- One row per (visitor, CV language). The visitor is an anonymous, salted hash:
-- no IP address or personal data is stored. Also drives the Telegram notification
-- (only the first download per visitor and language is announced).
CREATE TABLE IF NOT EXISTS cv_downloads (
  visitor    TEXT    NOT NULL,
  lang       TEXT    NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (visitor, lang)
);
CREATE INDEX IF NOT EXISTS cv_downloads_created ON cv_downloads (created_at);

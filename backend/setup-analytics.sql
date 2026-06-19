-- ============================================
-- Jigyasa Tech Platform — Analytics Setup
-- Run this in MySQL Workbench or terminal:
--   mysql -u root -p < setup-analytics.sql
-- ============================================

CREATE DATABASE IF NOT EXISTS personalblog_analytics;

USE personalblog_analytics;

CREATE TABLE IF NOT EXISTS article_views (
  id INT AUTO_INCREMENT PRIMARY KEY,
  article_id VARCHAR(255) NOT NULL,
  viewer_ip_hash VARCHAR(255) NOT NULL,
  viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_article (article_id),
  INDEX idx_viewed_at (viewed_at),
  INDEX idx_article_ip (article_id, viewer_ip_hash)
);

SELECT 'Analytics database and table created successfully!' AS status;

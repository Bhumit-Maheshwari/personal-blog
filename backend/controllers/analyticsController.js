const crypto = require('crypto')
const pool = require('../config/mysql')

/**
 * Log a view for an article (stored in MySQL).
 * De-duplicates views from the same IP within 1 hour.
 */
const logView = async (req, res) => {
  try {
    const articleId = req.params.id
    const ip = req.ip
    const ipHash = crypto
      .createHash('sha256')
      .update(ip)
      .digest('hex')

    const [existing] = await pool.query(
      `SELECT * FROM article_views
       WHERE article_id = ? AND viewer_ip_hash = ?
       AND viewed_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)`,
      [articleId, ipHash]
    )

    if (existing.length > 0) {
      return res.json({ message: 'Already counted' })
    }

    await pool.query(
      `INSERT INTO article_views (article_id, viewer_ip_hash) VALUES (?, ?)`,
      [articleId, ipHash]
    )

    res.json({ success: true })

  } catch (error) {
    console.log('View logging error:', error.message)
    res.status(500).json({ message: error.message })
  }
}

/**
 * Get aggregated analytics data from MySQL.
 * Returns array of { article_id, view_day, views }
 */
const getAnalytics = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT article_id,
              DATE(viewed_at) AS view_day,
              COUNT(*) AS views
       FROM article_views
       GROUP BY article_id, DATE(viewed_at)
       ORDER BY view_day DESC`
    )

    res.json(rows)

  } catch (error) {
    console.log('Analytics error:', error.message)
    res.status(500).json({ message: error.message })
  }
}

module.exports = { logView, getAnalytics }

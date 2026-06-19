const express = require('express')
const router = express.Router()

const {
  logView,
  getAnalytics
} = require('../controllers/analyticsController')

/**
 * Analytics routes — mounted at /api/analytics in server.js
 *
 * POST /api/analytics/view/:id  — log a page view for an article
 * GET  /api/analytics/articles  — get aggregated view analytics
 */

router.post('/view/:id', logView)
router.get('/articles', getAnalytics)

module.exports = router
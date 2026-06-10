const express =
require('express')

const router =
express.Router()

const {

  logView,

  getAnalytics

} = require(

'../controllers/analyticsController'

)

router.post(
  '/articles/:id/view',
  logView
)

router.get(
  '/analytics/articles',
  getAnalytics
)

module.exports =
router
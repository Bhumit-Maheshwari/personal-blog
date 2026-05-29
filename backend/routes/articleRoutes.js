const express = require('express')

const router = express.Router()

const {

  getArticles,

  getArticleBySlug,

  createArticle,

  updateArticle,

  deleteArticle,

  createComment

} = require(
  '../controllers/articleController'
)

/* GET ALL */

router.get(
  '/',
  getArticles
)

/* GET BY SLUG */

router.get(
  '/:slug',
  getArticleBySlug
)

/* CREATE */

router.post(
  '/',
  createArticle
)

/* UPDATE */

router.put(
  '/:id',
  updateArticle
)

/* DELETE */

router.delete(
  '/:id',
  deleteArticle
)

/* COMMENTS */

router.post(
  '/:id/comments',
  createComment
)

module.exports = router
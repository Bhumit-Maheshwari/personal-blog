const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const {
  getArticles,
  getArticleBySlug,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  createComment,
  getCommentsByArticleId
} = require('../controllers/articleController')

/* GET all articles (public) */
router.get('/', getArticles)

/* GET article by MongoDB _id — used by admin editor (public) */
router.get('/id/:id', getArticleById)

/* GET article by URL slug (public) */
router.get('/:slug', getArticleBySlug)

/* GET comments for an article (public) */
router.get('/:id/comments', getCommentsByArticleId)

/* CREATE article (protected) */
router.post('/', auth, createArticle)

/* UPDATE article (protected) */
router.put('/:id', auth, updateArticle)

/* DELETE article (protected) */
router.delete('/:id', auth, deleteArticle)

/* CREATE comment on an article (public) */
router.post('/:id/comments', createComment)

module.exports = router
const Article = require('../models/Article')
const Comment = require('../models/Comment')

/**
 * GET /api/articles
 * Returns all articles. Supports optional ?tag= query param for filtering.
 */
const getArticles = async (req, res) => {
  try {
    const filter = {}

    // If a tag query parameter is provided, filter articles by that tag
    if (req.query.tag) {
      filter.tags = req.query.tag
    }

    const articles = await Article.find(filter).sort({ publishedAt: -1 })
    res.json(articles)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * GET /api/articles/:slug
 * Returns a single article matched by its URL slug.
 */
const getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({
      slug: req.params.slug
    })

    if (!article) {
      return res.status(404).json({ message: 'Article not found' })
    }

    res.json(article)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * GET /api/articles/id/:id
 * Returns a single article matched by its MongoDB _id (used by admin editor).
 */
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)

    if (!article) {
      return res.status(404).json({ message: 'Article not found' })
    }

    res.json(article)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * POST /api/articles
 * Creates a new article from the request body.
 */
const createArticle = async (req, res) => {
  try {
    const article = await Article.create({
      title: req.body.title,
      slug: req.body.slug,
      excerpt: req.body.excerpt,
      body: req.body.body,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      status: req.body.status,
      authorId: req.body.authorId
    })

    res.status(201).json(article)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * PUT /api/articles/:id
 * Updates an existing article by its _id.
 */
const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!article) {
      return res.status(404).json({ message: 'Article not found' })
    }

    res.json(article)
  } catch (error) {
    res.status(500).json({ message: 'Update failed' })
  }
}

/**
 * DELETE /api/articles/:id
 * Deletes an article by its _id.
 */
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id)

    if (!article) {
      return res.status(404).json({ message: 'Article not found' })
    }

    res.json({ message: 'Article deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * POST /api/articles/:id/comments
 * Creates a new comment on the specified article.
 */
const createComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      articleId: req.params.id,
      name: req.body.name,
      message: req.body.message
    })

    res.status(201).json(comment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * GET /api/articles/:id/comments
 * Returns all comments for a specific article.
 */
const getCommentsByArticleId = async (req, res) => {
  try {
    const comments = await Comment.find({
      articleId: req.params.id
    }).sort({ createdAt: -1 })

    res.json(comments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getArticles,
  getArticleBySlug,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  createComment,
  getCommentsByArticleId
}
const express = require('express')
const router = express.Router()

const Author = require('../models/Author')
const Article = require('../models/Article')

const {
  getAuthors,
  getAuthorById
} = require('../controllers/authorController')

/* GET all authors */
router.get('/', getAuthors)

/* GET author by id */
router.get('/:id', getAuthorById)

/* GET all articles by a specific author */
router.get('/:id/articles', async (req, res) => {
  try {
    const articles = await Article.find({
      authorId: req.params.id
    }).sort({ publishedAt: -1 })

    res.json(articles)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

/* CREATE author */
router.post('/', async (req, res) => {
  try {
    const author = await Author.create(req.body)
    res.status(201).json(author)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

/* UPDATE author */
router.put('/:id', async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!author) {
      return res.status(404).json({ message: 'Author not found' })
    }
    res.json(author)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

/* DELETE author */
router.delete('/:id', async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id)
    if (!author) {
      return res.status(404).json({ message: 'Author not found' })
    }
    res.json({ message: 'Author deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
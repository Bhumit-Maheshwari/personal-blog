const express = require('express')

const router = express.Router()

const Author =
  require('../models/Author')

/* GET AUTHORS */


const {
  getAuthors,
  getAuthorById
} = require(
  '../controllers/authorController'
)

router.get('/', getAuthors)

router.get('/:id', getAuthorById)

/* CREATE AUTHOR */

router.post('/', async (req, res) => {

  const author =
    await Author.create(req.body)

  res.status(201).json(author)
})

module.exports = router
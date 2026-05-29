const express = require('express')

const router = express.Router()

const Author =
  require('../models/Author')

/* GET AUTHORS */

router.get('/', async (req, res) => {

  const authors =
    await Author.find()

  res.json(authors)
})

/* CREATE AUTHOR */

router.post('/', async (req, res) => {

  const author =
    await Author.create(req.body)

  res.status(201).json(author)
})

module.exports = router
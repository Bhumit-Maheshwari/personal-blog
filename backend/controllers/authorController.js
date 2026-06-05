const Author =
require('../models/Author')

const getAuthors =
async (req, res) => {

  const authors =
    await Author.find()

  res.json(authors)
}

const getAuthorById =
async (req, res) => {

  try {

    const author =
      await Author.findById(
        req.params.id
      )

    if (!author) {

      return res.status(404).json({
        message: 'Author not found'
      })
    }

    res.json(author)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  getAuthors,
  getAuthorById
}
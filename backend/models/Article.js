const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({

  slug: {
    type: String,
    required: true,
    unique: true
  },

  title: {
    type: String,
    required: true
  },

  body: {
    type: String,
    required: true
  },

  tags: [
    {
      type: String
    }
  ],

  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },

  publishedAt: {
    type: Date,
    default: Date.now
  }

})

module.exports =
  mongoose.model(
    'Article',
    articleSchema
  )
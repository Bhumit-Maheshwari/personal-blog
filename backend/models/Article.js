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

  excerpt: String,

  imageUrl: String,

  status: {
    type: String,
    enum: ['Published', 'Draft'],
    default: 'Published'
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

  viewCount: {
    type: Number,
    default: 0
  },

  publishedAt: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true })

module.exports =
  mongoose.model(
    'Article',
    articleSchema
  )
const mongoose = require('mongoose')

const commentSchema =
  new mongoose.Schema({

    articleId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: 'Article'
    },

    name: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    createdAt: {
      type: Date,
      default: Date.now
    }

  })

module.exports =
  mongoose.model(
    'Comment',
    commentSchema
  )
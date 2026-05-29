const Article =
  require('../models/Article')

const Comment =
  require('../models/Comment')

/* GET ALL ARTICLES */

const getArticles =
  async (req, res) => {

    const articles =
      await Article.find()

    res.json(articles)
}

/* GET ARTICLE BY SLUG */

const getArticleBySlug =
  async (req, res) => {

    const article =
      await Article.findOne({
        slug: req.params.slug
      })

    res.json(article)
}

/* CREATE ARTICLE */

const createArticle =
  async (req, res) => {

    const article =
      await Article.create(req.body)

    res.status(201).json(article)
}

/* UPDATE ARTICLE */

const updateArticle =
  async (req, res) => {

    const article =
      await Article.findByIdAndUpdate(

        req.params.id,

        req.body,

        { new: true }
      )

    res.json(article)
}

/* DELETE ARTICLE */

const deleteArticle =
  async (req, res) => {

    await Article.findByIdAndDelete(
      req.params.id
    )

    res.json({
      message:
        'Article deleted'
    })
}

/* CREATE COMMENT */

const createComment =
  async (req, res) => {

    const comment =
      await Comment.create({

        articleId: req.params.id,

        name: req.body.name,

        message: req.body.message
      })

    res.status(201).json(comment)
}

module.exports = {

  getArticles,

  getArticleBySlug,

  createArticle,

  updateArticle,

  deleteArticle,

  createComment
}
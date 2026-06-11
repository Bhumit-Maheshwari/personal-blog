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

    //const article =
    //  await Article.create(req.body)
    const article =
    await Article.create({

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
}

/* UPDATE ARTICLE */

const updateArticle = async (req, res) => {

  try {

    const article =
      await Article.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true
        }

      )

    res.json(article)

  } catch (error) {

    res.status(500).json({
      message:
      'Update failed'
    })
  }
}

/* DELETE ARTICLE */

const deleteArticle = async (req, res) => {

  try {

    await Article.findByIdAndDelete(
      req.params.id
    )

    res.json({
      message:
      'Article deleted successfully'
    })

  } catch (error) {

    res.status(500).json({
      message:
      'Delete failed'
    })
  }
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
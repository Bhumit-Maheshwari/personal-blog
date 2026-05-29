const mongoose =
  require('mongoose')

const dotenv =
  require('dotenv')

const connectDB =
  require('./config/db')

const Article =
  require('./models/Article')

dotenv.config()

connectDB()

const seedArticles =
  async () => {

    try {

      await Article.deleteMany()

      const articles = []

      for (let i = 1; i <= 20; i++) {

        articles.push({

          slug: `article-${i}`,

          title: `Sample Article ${i}`,

          body:
            `# Markdown Article ${i}`,

          tags: ['React', 'Node']
        })
      }

      await Article.insertMany(
        articles
      )

      console.log(
        '20 Articles Inserted'
      )

      process.exit()

    } catch (error) {

      console.log(error)

      process.exit(1)
    }
}

seedArticles()
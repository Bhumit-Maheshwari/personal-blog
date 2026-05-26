import ArticleCard from './ui/ArticleCard'

function ArticleList({ articles }) {

  return (

    <div
      className="article-grid"
    >

      {
        articles.map((article) => (

          <ArticleCard
            key={article.id}
            article={article}
          />

        ))
      }

    </div>

  )
}

export default ArticleList
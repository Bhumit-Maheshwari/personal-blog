import ArticleCard from './ui/ArticleCard'

function ArticleList({ articles }) {

  return (

    <div>

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
import {
  useEffect,
  useState
} from 'react'

import api
from '../../api/api'

function FeaturedArticles() {

  const [articles,
  setArticles] =
  useState([])

  useEffect(() => {

    const fetchData =
    async () => {

      const response =
      await api.get(
        '/articles'
      )

      setArticles(
      response.data.slice(0,3)
      )
    }

    fetchData()

  }, [])

  return (

    <section className="featured">

      <h2>

        Featured Articles

      </h2>

      <div className="featured-grid">

      {

      articles.map(article => (

      <div
        key={article._id}
        className="feature-card"
      >

        <h3>

          {article.title}

        </h3>

        <p>

          {article.excerpt}

        </p>

      </div>

      ))

      }

      </div>

    </section>

  )
}

export default FeaturedArticles
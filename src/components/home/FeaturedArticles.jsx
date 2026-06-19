import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/api'
import './FeaturedArticles.css'

function FeaturedArticles() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/articles')
        setArticles(response.data.slice(0, 3))
      } catch (error) {
        console.log('Failed to fetch featured articles:', error)
      }
    }
    fetchData()
  }, [])

  if (articles.length === 0) return null

  return (
    <section className="featured-section">
      <div className="container">
        <h2 className="section-heading">Featured Articles</h2>

        <div className="featured-grid">
          {articles.map(article => (
            <Link
              to={`/article/${article.slug}`}
              key={article._id}
              className="featured-card"
            >
              {article.imageUrl && (
                <div className="featured-card-image-wrapper">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="featured-card-image"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="featured-card-content">
                {article.tags && article.tags.length > 0 && (
                  <div className="featured-card-tags">
                    {article.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="tag-pill">{tag}</span>
                    ))}
                  </div>
                )}

                <h3 className="featured-card-title">{article.title}</h3>

                <p className="featured-card-excerpt">
                  {article.excerpt || article.body?.slice(0, 120) + '...'}
                </p>

                <span className="featured-card-link">
                  Read Article →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedArticles
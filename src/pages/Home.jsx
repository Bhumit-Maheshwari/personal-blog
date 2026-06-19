import api from '../api/api'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import fallbackArticles from '../data/articles'

import LoadingSpinner from '../components/common/LoadingSpinner'
import SEO from '../components/common/SEO'

import Hero from '../components/home/Hero'
import FeaturedArticles from '../components/home/FeaturedArticles'
import Categories from '../components/home/Categories'
import TopAuthors from '../components/home/TopAuthors'
import Newsletter from '../components/home/Newsletter'
import Footer from '../components/home/Footer'

import '../App.css'

function Home() {
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 6

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/articles')
        setArticles(response.data)
      } catch (error) {
        console.log('API failed, using fallback data:', error)
        setArticles(fallbackArticles)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  const selectedTag = searchParams.get('tag') || ''

  // Filter by tag
  let filteredArticles = selectedTag
    ? articles.filter(article => article.tags?.includes(selectedTag))
    : articles

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase()
    filteredArticles = filteredArticles.filter(article =>
      article.title?.toLowerCase().includes(query)
    )
  }

  // Pagination
  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle)
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedTag, searchQuery])

  if (loading) {
    return <LoadingSpinner />
  }

  const allTags = ['React', 'Node', 'MongoDB', 'JavaScript', 'CSS', 'AI']

  return (
    <div>
      <SEO
        title="Jigyasa — Tech Articles & Tutorials"
        description="Read articles about React, Node.js, MongoDB and modern web development."
        url={window.location.href}
      />

      <Hero />
      <FeaturedArticles />
      <Categories />
      <TopAuthors />
      <Newsletter />

      {/* Articles Section */}
      <section id="articles-section" className="page">
        <h2 className="section-heading">Latest Articles</h2>

        {/* Search */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-xl)' }}>
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search articles by title..."
              aria-label="Search articles"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Tag Filters */}
        <div className="tag-filters">
          <button
            className={`tag-filter-btn ${!selectedTag ? 'active' : ''}`}
            onClick={() => setSearchParams({})}
            aria-label="Show all articles"
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`tag-filter-btn ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSearchParams({ tag })}
              aria-label={`Filter ${tag} articles`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {currentArticles.length > 0 ? (
          <div className="article-grid">
            {currentArticles.map(article => (
              <Link
                to={`/article/${article.slug}`}
                key={article._id}
                className="article-card"
              >
                {article.imageUrl && (
                  <div className="article-card-image-wrapper">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="article-card-image"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="article-card-body">
                  {article.tags && article.tags.length > 0 && (
                    <div className="article-card-tags">
                      {article.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="tag-pill">{tag}</span>
                      ))}
                    </div>
                  )}

                  <h3 className="article-card-title">{article.title}</h3>

                  <p className="article-card-excerpt">
                    {article.excerpt || article.body?.slice(0, 150) + '...'}
                  </p>

                  <div className="article-card-footer">
                    <span className="reading-time">
                      {Math.ceil((article.body?.split(' ').length || 0) / 200)} min read
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-muted)' }}>
              No articles found matching your criteria.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(index + 1)}
                aria-label={`Go to page ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}

export default Home
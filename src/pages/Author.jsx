import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/api'
import LoadingSpinner from '../components/common/LoadingSpinner'
import SEO from '../components/common/SEO'
import ReactMarkdown from 'react-markdown'

function Author() {
  const { id } = useParams()
  const [author, setAuthor] = useState(null)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const authorRes = await api.get(`/authors/${id}`)
        setAuthor(authorRes.data)

        // Fetch author's articles
        try {
          const articlesRes = await api.get(`/authors/${id}/articles`)
          setArticles(articlesRes.data)
        } catch {
          // If the endpoint doesn't exist, try filtering from all articles
          try {
            const allArticles = await api.get('/articles')
            const authorArticles = allArticles.data.filter(
              (a) => a.authorId === id || a.authorId?._id === id
            )
            setArticles(authorArticles)
          } catch {
            setArticles([])
          }
        }
      } catch (err) {
        console.error(err)
        setError('Failed to load author')
      } finally {
        setLoading(false)
      }
    }

    fetchAuthorData()
  }, [id])

  if (loading) return <LoadingSpinner />

  if (error) {
    return (
      <div style={{
        padding: '60px 20px',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{ color: 'var(--color-text-primary)', marginBottom: '12px' }}>
          {error}
        </h2>
        <Link to="/authors" style={{
          color: 'var(--color-primary)',
          fontWeight: '600',
          textDecoration: 'none'
        }}>
          ← Back to Authors
        </Link>
      </div>
    )
  }

  if (!author) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>Author not found</h2>
        <Link to="/authors" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
          ← Back to Authors
        </Link>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <SEO
        title={`${author.name} — Jigyasa Tech Platform`}
        description={author.bio || `Articles by ${author.name}`}
        image={author.avatarUrl}
        url={window.location.href}
      />

      {/* ── Hero Banner ── */}
      <div style={{
        background: 'var(--gradient-hero)',
        padding: '60px 20px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          top: '-100px',
          right: '-50px'
        }} />
        <div style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
          bottom: '-60px',
          left: '10%'
        }} />

        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          position: 'relative',
          zIndex: 1,
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {/* Avatar */}
          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            border: '4px solid rgba(255,255,255,0.4)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <img
              src={author.avatarUrl}
              alt={author.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=6366f1&color=fff&size=140`
              }}
            />
          </div>

          {/* Info */}
          <div style={{ textAlign: 'center', flex: 1, minWidth: '250px' }}>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              color: 'white',
              marginBottom: '8px',
              fontWeight: '700'
            }}>
              {author.name}
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 'var(--text-lg)',
              lineHeight: '1.7',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              {author.bio}
            </p>

            {/* Stats */}
            <div style={{
              display: 'flex',
              gap: '32px',
              marginTop: '24px',
              justifyContent: 'center'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: '800',
                  color: 'white',
                  fontFamily: 'var(--font-heading)'
                }}>
                  {articles.length}
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '500'
                }}>
                  Articles
                </div>
              </div>
              <div style={{
                width: '1px',
                background: 'rgba(255,255,255,0.2)'
              }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: '800',
                  color: 'white',
                  fontFamily: 'var(--font-heading)'
                }}>
                  {articles.reduce((sum, a) => sum + (a.tags?.length || 0), 0)}
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '500'
                }}>
                  Topics
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content Area ── */}
      <div style={{
        maxWidth: '900px',
        margin: '-40px auto 0',
        padding: '0 20px 60px',
        position: 'relative',
        zIndex: 2
      }}>

        {/* Articles Section */}
        <div style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
          padding: '36px 32px',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-xl)',
              color: 'var(--color-text-primary)'
            }}>
              Published Articles
            </h2>
            <span style={{
              padding: '4px 12px',
              background: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-sm)',
              fontWeight: '600'
            }}>
              {articles.length} total
            </span>
          </div>

          {articles.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: 'var(--color-text-muted)'
            }}>
              <p style={{ fontSize: '3rem', marginBottom: '12px' }}>📝</p>
              <p>This author hasn't published any articles yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {articles.map((article) => (
                <Link
                  to={`/article/${article.slug}`}
                  key={article._id}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    gap: '20px',
                    padding: '20px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-light)',
                    transition: 'var(--transition-base)',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-primary)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border-light)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  {/* Article Image */}
                  {article.imageUrl && (
                    <div style={{
                      width: '120px',
                      height: '80px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}>
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.target.parentElement.style.display = 'none'
                        }}
                      />
                    </div>
                  )}

                  {/* Article Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--text-md)',
                      color: 'var(--color-text-primary)',
                      marginBottom: '6px',
                      fontWeight: '600'
                    }}>
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--text-sm)',
                        lineHeight: '1.5',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {article.excerpt}
                      </p>
                    )}
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      marginTop: '8px',
                      flexWrap: 'wrap'
                    }}>
                      {article.tags?.map((tag, i) => (
                        <span key={i} style={{
                          padding: '2px 10px',
                          background: 'var(--color-primary-light)',
                          color: 'var(--color-primary)',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.7rem',
                          fontWeight: '600'
                        }}>
                          {tag}
                        </span>
                      ))}
                      {article.publishedAt && (
                        <span style={{
                          color: 'var(--color-text-muted)',
                          fontSize: '0.7rem'
                        }}>
                          {new Date(article.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <span style={{
                    color: 'var(--color-primary)',
                    fontSize: '1.2rem',
                    flexShrink: 0
                  }}>
                    →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Back Link */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to="/authors" style={{
            color: 'var(--color-primary)',
            fontWeight: '600',
            textDecoration: 'none',
            fontSize: 'var(--text-md)'
          }}>
            ← View All Authors
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Author
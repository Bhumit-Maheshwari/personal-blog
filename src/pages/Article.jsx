import {
  Link
} from 'react-router-dom'

import api from '../api/api'

import LoadingSpinner
from '../components/common/LoadingSpinner'

import {
  useEffect,
  useState
} from 'react'

import {
  useParams
} from 'react-router-dom'

import ReactMarkdown
  from 'react-markdown'

import SEO
from '../components/common/SEO'

import fallbackArticles from '../data/articles'

function Article() {

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
  useState(null)

  const { slug } =
    useParams()

  const [comments, setComments] =
  useState([])

  const [name, setName] =
  useState('')

  const [message, setMessage] =
  useState('')

  const [
  relatedArticles,
  setRelatedArticles
] = useState([])

  const [article, setArticle] =
    useState(null)

  useEffect(() => {

    const fetchArticle =
      async () => {

        try {

          const response =
           
                await api.get(
                 `/articles/${slug}`)
                 
          console.log(
            response.data
          )

          const allArticles =
              await api.get(
                    '/articles'
              )

          const related =
                allArticles.data.filter(

                (item) =>

                  item._id !==
                  response.data._id

                  &&

                  item.tags?.some(

                tag =>

                  response.data.tags?.includes(
                tag
              )

            )
          )

          setRelatedArticles(
          related.slice(0, 3)
        )

          setComments(
            response.data.comments || []
        )

          setArticle(
            response.data
          )

          // Track view - don't let failure block the page
          try {
            await api.post(
              `/analytics/view/${response.data._id}`
            )
          } catch (viewErr) {
            console.log('View tracking unavailable')
          }

          setLoading(false)

        } catch (error) {

          console.log('API failed, trying fallback data:', error)

          // Fallback to local data
          const localArticle = fallbackArticles.find(
            (a) => a.slug === slug
          )

          if (localArticle) {
            setArticle(localArticle)
            setComments([])

            // Find related from fallback
            const related = fallbackArticles.filter(
              (item) =>
                item._id !== localArticle._id &&
                item.tags?.some(
                  (tag) => localArticle.tags?.includes(tag)
                )
            )
            setRelatedArticles(related.slice(0, 3))
          } else {
            setError('Failed to load article')
          }

          setLoading(false)
        }
      }

    fetchArticle()

  }, [slug])

  // Show loading spinner FIRST
  if (loading) {
    return <LoadingSpinner />
  }

  // Then check for errors
  if (error) {
    return (
      <div style={{
        padding: '60px 20px',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{
          color: 'var(--color-text-primary)',
          marginBottom: '12px'
        }}>
          {error}
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
          Make sure the backend server is running and the database is seeded.
        </p>
        <Link to="/" style={{
          color: 'var(--color-primary)',
          fontWeight: '600',
          textDecoration: 'none'
        }}>
          ← Back to Home
        </Link>
      </div>
    )
  }

  // Then check if article exists
  if (!article) {
    return (
      <div style={{
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: 'var(--color-text-primary)' }}>Article not found</h2>
        <Link to="/" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </div>
    )
  }

  const readingTime = Math.ceil((article.body || '').split(' ').length / 200)

  const handleCommentSubmit =
    async (e) => {

    e.preventDefault()

    try {

      await api.post(

        `/articles/${article._id}/comments`,

        {
          name,
          message
        }

      )

      const updatedArticle =
        await api.get(

          `/articles/${slug}`
        )

      setComments(
        updatedArticle.data.comments || []
      )

      setName('')
      setMessage('')

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <div
      style={{
        padding: '40px 20px',
        maxWidth: '800px',
        margin: '0 auto'
      }}
    >

      <SEO

          title={article.title}

          description={
            article.excerpt ||
            (article.body || '').slice(0,120)
          }

          image={
            article.imageUrl
          }

          url={
            window.location.href
          }

        />

      {/* Cover Image */}
      {article.imageUrl && (
        <div style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          marginBottom: '32px',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <img
            src={article.imageUrl}
            alt={article.title}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              display: 'block'
            }}
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
      )}

      {/* Tags & Reading Time */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px',
        flexWrap: 'wrap'
      }}>
        {article.tags?.map((tag, index) => (
          <span
            key={index}
            style={{
              padding: '4px 14px',
              background: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-sm)',
              fontWeight: '600'
            }}
          >
            {tag}
          </span>
        ))}
        <span style={{
          color: 'var(--color-text-muted)',
          fontSize: 'var(--text-sm)'
        }}>
          ☕ {readingTime} min read
        </span>
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--text-3xl)',
        color: 'var(--color-text-primary)',
        marginBottom: '32px',
        lineHeight: '1.3'
      }}>
        {article.title}
      </h1>

      {/* Article Content */}
      <div
        className="markdown-content"
        style={{
          color: 'var(--color-text-primary)',
          lineHeight: '1.8',
          fontSize: 'var(--text-md)'
        }}
      >
        <ReactMarkdown>
          {article.body}
        </ReactMarkdown>
      </div>

      {/* Divider */}
      <hr style={{
        border: 'none',
        borderTop: '1px solid var(--color-border)',
        margin: '48px 0 32px'
      }} />

      {/* Comments Section */}
      <h2 style={{
        fontFamily: 'var(--font-heading)',
        color: 'var(--color-text-primary)',
        marginBottom: '20px'
      }}>
        Comments ({comments.length})
      </h2>

      {comments.length === 0 && (
        <p style={{
          color: 'var(--color-text-muted)',
          marginBottom: '24px'
        }}>
          No comments yet. Be the first to share your thoughts!
        </p>
      )}

      {comments.map((comment) => (
        <div
          key={comment._id}
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            marginBottom: '12px'
          }}
        >
          <strong style={{ color: 'var(--color-text-primary)' }}>
            {comment.name}
          </strong>
          <p style={{
            color: 'var(--color-text-secondary)',
            marginTop: '6px',
            lineHeight: '1.5'
          }}>
            {comment.message}
          </p>
        </div>
      ))}

      {/* Comment Form */}
      <form
        onSubmit={handleCommentSubmit}
        style={{
          marginTop: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        <input
          type="text"
          placeholder="Your Name"
          aria-label="Commenter Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
          style={{
            padding: '12px 16px',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-surface)',
            color: 'var(--color-text-primary)',
            fontSize: 'var(--text-md)'
          }}
        />

        <textarea
          placeholder="Write a comment..."
          aria-label="Comment Message"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          required
          rows={4}
          style={{
            padding: '12px 16px',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-surface)',
            color: 'var(--color-text-primary)',
            fontSize: 'var(--text-md)',
            resize: 'vertical'
          }}
        />

        <button
          type="submit"
          aria-label="Submit Comment"
          style={{
            padding: '12px 24px',
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: 'var(--text-md)',
            alignSelf: 'flex-start',
            transition: 'var(--transition-base)'
          }}
        >
          Add Comment
        </button>
      </form>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div style={{ marginTop: '48px' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-text-primary)',
            marginBottom: '20px'
          }}>
            Related Articles
          </h2>

          <div style={{
            display: 'grid',
            gap: '16px'
          }}>
            {relatedArticles.map((item) => (
              <Link
                to={`/article/${item.slug}`}
                key={item._id}
                style={{
                  textDecoration: 'none',
                  display: 'block',
                  padding: '16px 20px',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'var(--transition-base)',
                  color: 'var(--color-text-primary)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(4px)'
                  e.currentTarget.style.borderColor = 'var(--color-primary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)'
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                }}
              >
                <strong>{item.title}</strong>
                {item.excerpt && (
                  <p style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--text-sm)',
                    marginTop: '4px'
                  }}>
                    {item.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default Article
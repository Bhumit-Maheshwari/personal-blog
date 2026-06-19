import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api'
import LoadingSpinner from '../components/common/LoadingSpinner'
import SEO from '../components/common/SEO'
import '../App.css'

function Authors() {
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await api.get('/authors')
        setAuthors(response.data)
      } catch (err) {
        console.error('Failed to load authors:', err)
        setError('Unable to load authors at this time.')
      } finally {
        setLoading(false)
      }
    }
    fetchAuthors()
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      <SEO
        title="Authors — Jigyasa Tech Platform"
        description="Meet the talented authors behind Jigyasa Tech Platform articles."
        url={window.location.href}
      />

      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{
          fontSize: 'var(--text-3xl)',
          fontFamily: 'var(--font-heading)',
          color: 'var(--color-text-primary)',
          marginBottom: '12px'
        }}>
          Our Authors
        </h1>
        <p style={{
          fontSize: 'var(--text-lg)',
          color: 'var(--color-text-secondary)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Meet the talented developers and writers behind our articles
        </p>
      </div>

      {error && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: 'var(--color-text-secondary)'
        }}>
          <p style={{ fontSize: '1.2rem' }}>{error}</p>
          <p style={{ marginTop: '8px' }}>Please make sure the backend server is running.</p>
        </div>
      )}

      {!error && authors.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: 'var(--color-text-secondary)'
        }}>
          <p style={{ fontSize: '1.2rem' }}>No authors found. Run the seed script to populate data.</p>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {authors.map((author) => (
          <Link
            to={`/author/${author._id}`}
            key={author._id}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px 24px',
              textAlign: 'center',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-md)',
              transition: 'var(--transition-base)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'var(--shadow-md)'
            }}
            >
              <img
                src={author.avatarUrl}
                alt={author.name}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid var(--color-primary)',
                  marginBottom: '16px'
                }}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=6366f1&color=fff&size=100`
                }}
              />
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-xl)',
                color: 'var(--color-text-primary)',
                marginBottom: '8px'
              }}>
                {author.name}
              </h3>
              <p style={{
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--text-sm)',
                lineHeight: '1.6'
              }}>
                {author.bio || 'Tech writer and developer'}
              </p>
              <span style={{
                display: 'inline-block',
                marginTop: '12px',
                color: 'var(--color-primary)',
                fontWeight: '600',
                fontSize: 'var(--text-sm)'
              }}>
                View Profile →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Authors

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/api'
import './TopAuthors.css'

function TopAuthors() {
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await api.get('/authors')
        setAuthors(response.data)
      } catch (error) {
        console.log('Failed to fetch authors:', error)
      }
    }
    fetchAuthors()
  }, [])

  if (authors.length === 0) return null

  return (
    <section className="authors-section" aria-label="Top Authors">
      <div className="container">
        <h2 className="section-heading">Top Authors</h2>

        <div className="author-grid">
          {authors.map(author => (
            <Link
              to={`/author/${author._id}`}
              key={author._id}
              className="author-card"
            >
              <img
                src={author.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=6366f1&color=fff&size=128`}
                alt={author.name}
                className="author-card-avatar"
                loading="lazy"
              />
              <h3 className="author-card-name">{author.name}</h3>
              <p className="author-card-bio">{author.bio}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopAuthors
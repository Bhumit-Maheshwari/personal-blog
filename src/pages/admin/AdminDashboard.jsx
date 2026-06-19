import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/api'
import AdminLayout from '../../components/admin/AdminLayout'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import './AdminDashboard.css'

function AdminDashboard() {
  const [articles, setArticles] = useState([])
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [articleRes, authorRes] = await Promise.all([
          api.get('/articles'),
          api.get('/authors')
        ])
        setArticles(articleRes.data)
        setAuthors(authorRes.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <AdminLayout>
        <LoadingSpinner />
      </AdminLayout>
    )
  }

  const publishedCount = articles.filter(a => a.status === 'Published').length
  const draftCount = articles.filter(a => a.status === 'Draft').length
  const allTags = [...new Set(articles.flatMap(a => a.tags || []))]
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening'

  return (
    <AdminLayout>
      <div className="admin-dashboard">

        {/* Header */}
        <div className="dash-header">
          <div>
            <h1 className="dash-title">{greeting} 👋</h1>
            <p className="dash-subtitle">Here's what's happening on Jigyasa today</p>
          </div>
          <Link to="/admin/articles/new" className="dash-cta-btn">
            + New Article
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="dash-stats">
          <div className="dash-stat-card dash-stat-primary">
            <div className="dash-stat-icon">📝</div>
            <div className="dash-stat-info">
              <span className="dash-stat-number">{articles.length}</span>
              <span className="dash-stat-label">Total Articles</span>
            </div>
          </div>

          <div className="dash-stat-card dash-stat-green">
            <div className="dash-stat-icon">✅</div>
            <div className="dash-stat-info">
              <span className="dash-stat-number">{publishedCount}</span>
              <span className="dash-stat-label">Published</span>
            </div>
          </div>

          <div className="dash-stat-card dash-stat-orange">
            <div className="dash-stat-icon">📋</div>
            <div className="dash-stat-info">
              <span className="dash-stat-number">{draftCount}</span>
              <span className="dash-stat-label">Drafts</span>
            </div>
          </div>

          <div className="dash-stat-card dash-stat-purple">
            <div className="dash-stat-icon">👥</div>
            <div className="dash-stat-info">
              <span className="dash-stat-number">{authors.length}</span>
              <span className="dash-stat-label">Authors</span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="dash-content-grid">

          {/* Recent Articles */}
          <div className="dash-section">
            <div className="dash-section-header">
              <h2 className="dash-section-title">Recent Articles</h2>
              <Link to="/admin/articles" className="dash-view-all">View All →</Link>
            </div>

            <div className="dash-article-list">
              {articles.slice(0, 5).map(article => (
                <Link
                  to={`/admin/articles/${article._id}/edit`}
                  key={article._id}
                  className="dash-article-item"
                >
                  {article.imageUrl && (
                    <div className="dash-article-thumb">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        onError={(e) => { e.target.parentElement.style.display = 'none' }}
                      />
                    </div>
                  )}
                  <div className="dash-article-info">
                    <h4 className="dash-article-title">{article.title}</h4>
                    <div className="dash-article-meta">
                      <span className={`dash-status-badge ${article.status === 'Published' ? 'published' : 'draft'}`}>
                        {article.status}
                      </span>
                      {article.publishedAt && (
                        <span className="dash-article-date">
                          {new Date(article.publishedAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric'
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="dash-sidebar-panels">

            {/* Authors Panel */}
            <div className="dash-section">
              <div className="dash-section-header">
                <h2 className="dash-section-title">Team</h2>
                <Link to="/admin/authors" className="dash-view-all">All →</Link>
              </div>
              <div className="dash-authors-list">
                {authors.map(author => (
                  <div key={author._id} className="dash-author-item">
                    <img
                      src={author.avatarUrl}
                      alt={author.name}
                      className="dash-author-avatar"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=6366f1&color=fff&size=40`
                      }}
                    />
                    <div>
                      <h4 className="dash-author-name">{author.name}</h4>
                      <p className="dash-author-bio">
                        {(author.bio || '').slice(0, 50)}{(author.bio || '').length > 50 ? '...' : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Cloud */}
            <div className="dash-section">
              <h2 className="dash-section-title" style={{ marginBottom: '16px' }}>Popular Tags</h2>
              <div className="dash-tags-cloud">
                {allTags.map((tag, i) => {
                  const count = articles.filter(a => a.tags?.includes(tag)).length
                  return (
                    <span key={i} className="dash-tag-pill">
                      {tag}
                      <span className="dash-tag-count">{count}</span>
                    </span>
                  )
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="dash-section">
              <h2 className="dash-section-title" style={{ marginBottom: '16px' }}>Quick Actions</h2>
              <div className="dash-quick-actions">
                <Link to="/admin/articles/new" className="dash-action-btn">
                  ✏️ Write Article
                </Link>
                <Link to="/admin/stats" className="dash-action-btn">
                  📈 View Analytics
                </Link>
                <Link to="/" className="dash-action-btn" target="_blank">
                  🌐 Visit Site
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
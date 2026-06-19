import { Link, useNavigate } from 'react-router-dom'
import './AdminLayout.css'

function AdminLayout({ children }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin')
  }

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h2 className="admin-logo">Jigyasa</h2>
        <p className="admin-subtitle">Tech Blog CMS</p>

        <div className="admin-nav">
          <Link to="/admin/dashboard">📊 Dashboard</Link>
          <Link to="/admin/articles">📝 Articles</Link>
          <Link to="/admin/articles/new">➕ New Article</Link>
          <Link to="/admin/authors">👨‍💻 Authors</Link>
          <Link to="/admin/stats">📈 Analytics</Link>

          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>

      <main className="admin-content">
        {children}
      </main>
    </div>
  )
}

export default AdminLayout
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/api'
import AdminLayout from '../../components/admin/AdminLayout'
import LoadingSpinner from '../../components/common/LoadingSpinner'

function AdminAuthors() {
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)

  // Edit modal state
  const [editingAuthor, setEditingAuthor] = useState(null)
  const [editName, setEditName] = useState('')
  const [editBio, setEditBio] = useState('')
  const [editAvatar, setEditAvatar] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  // Add new author state
  const [showAddForm, setShowAddForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newBio, setNewBio] = useState('')
  const [newAvatar, setNewAvatar] = useState('')

  useEffect(() => {
    fetchAuthors()
  }, [])

  const fetchAuthors = async () => {
    try {
      const response = await api.get('/authors')
      setAuthors(response.data)
    } catch (error) {
      console.error('Failed to load authors:', error)
    } finally {
      setLoading(false)
    }
  }

  // ── Image Upload ──
  const uploadImage = async (file, setUrlFn) => {
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setUrlFn(response.data.url)
    } catch (backendErr) {
      // Fallback: direct Cloudinary
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'personal_blog_images')
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dgowamccj/image/upload',
          { method: 'POST', body: formData }
        )
        const data = await response.json()
        if (data.secure_url) setUrlFn(data.secure_url)
        else alert('Upload failed')
      } catch {
        alert('Image upload failed')
      }
    } finally {
      setUploading(false)
    }
  }

  // ── Edit Author ──
  const openEditModal = (author) => {
    setEditingAuthor(author)
    setEditName(author.name)
    setEditBio(author.bio || '')
    setEditAvatar(author.avatarUrl || '')
  }

  const closeEditModal = () => {
    setEditingAuthor(null)
    setEditName('')
    setEditBio('')
    setEditAvatar('')
  }

  const handleUpdateAuthor = async () => {
    if (!editName.trim()) {
      alert('Name is required')
      return
    }
    setSaving(true)
    try {
      await api.put(`/authors/${editingAuthor._id}`, {
        name: editName,
        bio: editBio,
        avatarUrl: editAvatar
      })
      closeEditModal()
      fetchAuthors()
    } catch (error) {
      console.error(error)
      alert('Failed to update author')
    } finally {
      setSaving(false)
    }
  }

  // ── Delete Author ──
  const handleDeleteAuthor = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return
    try {
      await api.delete(`/authors/${id}`)
      fetchAuthors()
    } catch (error) {
      console.error(error)
      alert('Failed to delete author')
    }
  }

  // ── Add Author ──
  const handleAddAuthor = async () => {
    if (!newName.trim()) {
      alert('Name is required')
      return
    }
    setSaving(true)
    try {
      await api.post('/authors', {
        name: newName,
        bio: newBio,
        avatarUrl: newAvatar
      })
      setShowAddForm(false)
      setNewName('')
      setNewBio('')
      setNewAvatar('')
      fetchAuthors()
    } catch (error) {
      console.error(error)
      alert('Failed to add author')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <LoadingSpinner />
      </AdminLayout>
    )
  }

  // ── Inline styles (keeping consistent with your project style) ──
  const cardStyle = {
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--color-border)',
    padding: '24px',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    transition: 'var(--transition-base)'
  }

  const avatarStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid var(--color-primary)',
    flexShrink: 0
  }

  const modalOverlay = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  }

  const modalBox = {
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-xl)',
    padding: '32px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--color-border)'
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    background: 'var(--color-background)',
    color: 'var(--color-text-primary)',
    fontSize: 'var(--text-md)',
    boxSizing: 'border-box',
    outline: 'none',
    fontFamily: 'inherit'
  }

  const btnPrimary = {
    padding: '10px 24px',
    background: 'var(--gradient-primary)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: 'var(--text-sm)'
  }

  const btnSecondary = {
    padding: '10px 24px',
    background: 'var(--color-surface)',
    color: 'var(--color-text-secondary)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: 'var(--text-sm)'
  }

  const btnDanger = {
    padding: '6px 14px',
    background: 'rgba(239,68,68,0.1)',
    color: '#ef4444',
    border: '1px solid rgba(239,68,68,0.2)',
    borderRadius: 'var(--radius-md)',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.75rem'
  }

  const btnEdit = {
    padding: '6px 14px',
    background: 'var(--color-primary-light)',
    color: 'var(--color-primary)',
    border: '1px solid rgba(99,102,241,0.2)',
    borderRadius: 'var(--radius-md)',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.75rem'
  }

  return (
    <AdminLayout>
      <div style={{ padding: '10px 0' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <h1 style={{
              fontSize: '1.8rem',
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-text-primary)',
              marginBottom: '4px'
            }}>
              Authors
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
              Manage blog authors — edit name, bio, and avatar
            </p>
          </div>
          <button style={btnPrimary} onClick={() => setShowAddForm(true)}>
            + Add Author
          </button>
        </div>

        {/* Author Cards */}
        {authors.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-secondary)' }}>
            <p>No authors found. Click "Add Author" to create one.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {authors.map((author) => (
              <div key={author._id} style={cardStyle}>
                <img
                  src={author.avatarUrl}
                  alt={author.name}
                  style={avatarStyle}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=6366f1&color=fff&size=80`
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                    color: 'var(--color-text-primary)',
                    marginBottom: '4px'
                  }}>
                    {author.name}
                  </h3>
                  <p style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--text-sm)',
                    lineHeight: '1.5',
                    marginBottom: '10px'
                  }}>
                    {author.bio || 'No bio added'}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button style={btnEdit} onClick={() => openEditModal(author)}>
                      ✏️ Edit
                    </button>
                    <Link
                      to={`/author/${author._id}`}
                      style={{ ...btnEdit, textDecoration: 'none' }}
                    >
                      👁️ View
                    </Link>
                    <button style={btnDanger} onClick={() => handleDeleteAuthor(author._id, author.name)}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Edit Modal ── */}
      {editingAuthor && (
        <div style={modalOverlay} onClick={closeEditModal}>
          <div style={modalBox} onClick={(e) => e.stopPropagation()}>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-text-primary)',
              marginBottom: '24px'
            }}>
              Edit Author
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Avatar Preview */}
              <div style={{ textAlign: 'center' }}>
                <img
                  src={editAvatar}
                  alt={editName}
                  style={{ ...avatarStyle, width: '100px', height: '100px', margin: '0 auto 12px' }}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(editName)}&background=6366f1&color=fff&size=100`
                  }}
                />
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    id="edit-avatar-upload"
                    style={{ display: 'none' }}
                    onChange={(e) => uploadImage(e.target.files[0], setEditAvatar)}
                  />
                  <label htmlFor="edit-avatar-upload" style={{
                    ...btnEdit,
                    display: 'inline-block',
                    cursor: 'pointer'
                  }}>
                    {uploading ? '⏳ Uploading...' : '📷 Change Photo'}
                  </label>
                </div>
              </div>

              {/* Name */}
              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--color-text-primary)', display: 'block', marginBottom: '4px' }}>
                  Name *
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  style={inputStyle}
                  placeholder="Author name"
                />
              </div>

              {/* Bio */}
              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--color-text-primary)', display: 'block', marginBottom: '4px' }}>
                  Bio
                </label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                  placeholder="Author bio/description"
                />
              </div>

              {/* Avatar URL */}
              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--color-text-primary)', display: 'block', marginBottom: '4px' }}>
                  Avatar URL
                </label>
                <input
                  type="text"
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                  style={inputStyle}
                  placeholder="Or paste image URL"
                />
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button style={btnSecondary} onClick={closeEditModal}>Cancel</button>
                <button style={btnPrimary} onClick={handleUpdateAuthor} disabled={saving || uploading}>
                  {saving ? 'Saving...' : '✅ Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Author Modal ── */}
      {showAddForm && (
        <div style={modalOverlay} onClick={() => setShowAddForm(false)}>
          <div style={modalBox} onClick={(e) => e.stopPropagation()}>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-text-primary)',
              marginBottom: '24px'
            }}>
              Add New Author
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Avatar */}
              <div style={{ textAlign: 'center' }}>
                {newAvatar && (
                  <img
                    src={newAvatar}
                    alt="Preview"
                    style={{ ...avatarStyle, width: '100px', height: '100px', margin: '0 auto 12px' }}
                  />
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    id="new-avatar-upload"
                    style={{ display: 'none' }}
                    onChange={(e) => uploadImage(e.target.files[0], setNewAvatar)}
                  />
                  <label htmlFor="new-avatar-upload" style={{
                    ...btnEdit,
                    display: 'inline-block',
                    cursor: 'pointer'
                  }}>
                    {uploading ? '⏳ Uploading...' : '📷 Upload Photo'}
                  </label>
                </div>
              </div>

              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--color-text-primary)', display: 'block', marginBottom: '4px' }}>
                  Name *
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={inputStyle}
                  placeholder="Author name"
                />
              </div>

              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--color-text-primary)', display: 'block', marginBottom: '4px' }}>
                  Bio
                </label>
                <textarea
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                  placeholder="Author bio"
                />
              </div>

              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--color-text-primary)', display: 'block', marginBottom: '4px' }}>
                  Avatar URL
                </label>
                <input
                  type="text"
                  value={newAvatar}
                  onChange={(e) => setNewAvatar(e.target.value)}
                  style={inputStyle}
                  placeholder="Or paste image URL"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button style={btnSecondary} onClick={() => setShowAddForm(false)}>Cancel</button>
                <button style={btnPrimary} onClick={handleAddAuthor} disabled={saving || uploading}>
                  {saving ? 'Saving...' : '➕ Add Author'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default AdminAuthors

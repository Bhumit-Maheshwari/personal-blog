import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import api from '../../api/api'
import AdminLayout from '../../components/admin/AdminLayout'
import './AdminNewArticle.css'

function AdminEditArticle() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [authors, setAuthors] = useState([])
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [tags, setTags] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [status, setStatus] = useState('Draft')
  const [body, setBody] = useState('')
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await api.get('/authors')
        setAuthors(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAuthors()
  }, [])

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get('/articles')
        const article = response.data.find(item => item._id === id)

        if (article) {
          setTitle(article.title || '')
          setSlug(article.slug || '')
          setExcerpt(article.excerpt || '')
          setImageUrl(article.imageUrl || '')
          setStatus(article.status || 'Draft')
          setBody(article.body || '')
          setTags(article.tags?.join(', ') || '')
          setAuthorId(article.authorId || '')
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [id])

  const uploadImage = async (file) => {
    if (!file) return
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setImageUrl(response.data.url)
    } catch (backendErr) {
      console.log('Backend upload failed, trying direct Cloudinary:', backendErr.message)
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'personal_blog_images')

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dgowamccj/image/upload',
          { method: 'POST', body: formData }
        )
        const data = await response.json()
        if (data.secure_url) {
          setImageUrl(data.secure_url)
        } else {
          alert('Image upload failed.')
        }
      } catch (cloudErr) {
        console.error('Upload failed:', cloudErr)
        alert('Image upload failed. Check Cloudinary settings.')
      }
    } finally {
      setUploading(false)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      await api.put(`/articles/${id}`, {
        title,
        slug,
        excerpt,
        imageUrl,
        body,
        status,
        authorId,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean)
      })

      alert('Article Updated')
      navigate('/admin/articles')
    } catch (error) {
      console.log(error)
      alert('Failed to update article.')
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
          Loading article...
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="article-form-page">
        <h1 className="article-form-title">Edit Article</h1>
        <p className="article-form-subtitle">Update article content and settings</p>

        <form className="article-form" onSubmit={handleUpdate}>

          {/* Title */}
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Article title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Slug */}
          <div className="form-group">
            <label className="form-label">Slug</label>
            <input
              type="text"
              className="form-input"
              placeholder="article-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>

          {/* Excerpt */}
          <div className="form-group">
            <label className="form-label">Excerpt</label>
            <textarea
              className="form-input form-textarea"
              placeholder="Brief description..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
            />
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label className="form-label">Featured Image</label>
            <div className="image-upload-area">
              <input
                type="file"
                accept="image/*"
                id="image-upload-edit"
                className="file-input-hidden"
                onChange={(e) => uploadImage(e.target.files[0])}
              />
              <label htmlFor="image-upload-edit" className="file-input-label">
                {uploading ? (
                  <span>⏳ Uploading...</span>
                ) : (
                  <span>📁 Choose new image</span>
                )}
              </label>

              {imageUrl && (
                <div className="image-preview">
                  <img src={imageUrl} alt="Preview" />
                  <button
                    type="button"
                    className="image-remove-btn"
                    onClick={() => setImageUrl('')}
                  >
                    ✕ Remove
                  </button>
                </div>
              )}

              <input
                type="text"
                className="form-input"
                placeholder="Or paste image URL..."
                value={imageUrl || ''}
                onChange={(e) => setImageUrl(e.target.value)}
                style={{ marginTop: '10px' }}
              />
            </div>
          </div>

          {/* Two-column */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Author</label>
              <select
                className="form-input"
                value={authorId || ''}
                onChange={(e) => setAuthorId(e.target.value)}
              >
                <option value="">Select Author</option>
                {authors?.map(author => (
                  <option key={author._id} value={author._id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-input"
                value={status || 'Draft'}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Draft</option>
                <option>Published</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="form-group">
            <label className="form-label">Tags</label>
            <input
              type="text"
              className="form-input"
              placeholder="React, Node, MongoDB (comma separated)"
              value={tags || ''}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          {/* Markdown Editor */}
          <div className="form-group">
            <label className="form-label">Content (Markdown)</label>
            <div data-color-mode="light">
              <MDEditor
                value={body || ''}
                onChange={(value) => setBody(value || '')}
                height={500}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/admin/articles')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={uploading}
            >
              ✅ Update Article
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default AdminEditArticle
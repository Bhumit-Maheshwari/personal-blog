import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import api from '../../api/api'
import AdminLayout from '../../components/admin/AdminLayout'
import './AdminNewArticle.css'

function AdminNewArticle() {
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

  // Auto-generate slug from title
  const handleTitleChange = (value) => {
    setTitle(value)
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(value))
    }
  }

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const uploadImage = async (file) => {
    if (!file) return
    setUploading(true)

    try {
      // Try backend upload route first (server-side Cloudinary)
      const formData = new FormData()
      formData.append('image', file)

      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      setImageUrl(response.data.url)
    } catch (backendErr) {
      console.log('Backend upload failed, trying direct Cloudinary:', backendErr.message)

      // Fallback: direct client-side Cloudinary upload
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
          alert('Image upload failed. Please try again.')
        }
      } catch (cloudErr) {
        console.error('Direct Cloudinary upload also failed:', cloudErr)
        alert('Image upload failed. Check your Cloudinary settings.')
      }
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !slug || !body) {
      alert('Title, slug, and body are required.')
      return
    }

    try {
      await api.post('/articles', {
        title,
        slug,
        excerpt,
        imageUrl,
        body,
        authorId,
        status,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean)
      })

      alert('Article Created Successfully')
      navigate('/admin/articles')
    } catch (error) {
      console.log(error)
      alert('Failed to create article. Check console for details.')
    }
  }

  return (
    <AdminLayout>
      <div className="article-form-page">
        <h1 className="article-form-title">Create New Article</h1>
        <p className="article-form-subtitle">Write and publish a new article to Jigyasa</p>

        <form className="article-form" onSubmit={handleSubmit}>

          {/* Title */}
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter article title..."
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
            />
          </div>

          {/* Slug */}
          <div className="form-group">
            <label className="form-label">Slug *</label>
            <input
              type="text"
              className="form-input"
              placeholder="article-url-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>

          {/* Excerpt */}
          <div className="form-group">
            <label className="form-label">Excerpt</label>
            <textarea
              className="form-input form-textarea"
              placeholder="Brief description of the article..."
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
                id="image-upload"
                className="file-input-hidden"
                onChange={(e) => uploadImage(e.target.files[0])}
              />
              <label htmlFor="image-upload" className="file-input-label">
                {uploading ? (
                  <span>⏳ Uploading...</span>
                ) : (
                  <span>📁 Choose image or drag & drop</span>
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

              {/* Also allow manual URL input */}
              <input
                type="text"
                className="form-input"
                placeholder="Or paste image URL..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                style={{ marginTop: '10px' }}
              />
            </div>
          </div>

          {/* Two-column row */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Author</label>
              <select
                className="form-input"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
              >
                <option value="">Select Author</option>
                {authors.map(author => (
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
                value={status}
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
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          {/* Markdown Editor */}
          <div className="form-group">
            <label className="form-label">Content * (Markdown)</label>
            <div data-color-mode="light">
              <MDEditor
                value={body}
                onChange={setBody}
                height={500}
              />
            </div>
          </div>

          {/* Submit */}
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
              {status === 'Published' ? '🚀 Publish Article' : '💾 Save Draft'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default AdminNewArticle
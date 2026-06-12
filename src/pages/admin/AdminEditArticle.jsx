import {
  useState,
  useEffect
} from 'react'

import {
  useParams,
  useNavigate
} from 'react-router-dom'

import MDEditor
from '@uiw/react-md-editor'

import api
from '../../api/api'

import AdminLayout
from '../../components/admin/AdminLayout'

import './AdminNewArticle.css'

function AdminEditArticle() {

  const { id } =
    useParams()

  const navigate =
    useNavigate()

  const [authors, setAuthors] =
    useState([])

  const [title, setTitle] =
    useState('')

  const [slug, setSlug] =
    useState('')

  const [excerpt, setExcerpt] =
    useState('')

  const [imageUrl, setImageUrl] =
    useState('')

  const [tags, setTags] =
    useState('')

  const [authorId, setAuthorId] =
  useState('')  

  const [status, setStatus] =
    useState('Draft')

  const [body, setBody] =
    useState('')

  
  useEffect(() => {

    const fetchAuthors =
      async () => {

        try {

          const response =
            await api.get(
              '/authors'
            )

          setAuthors(
            response.data
          )

        } catch (error) {

          console.log(error)
        }
      }

    fetchAuthors()
  }, [])


useEffect(() => {

  const fetchArticle =
    async () => {

      const response =
        await api.get(
          '/articles'
        )

      const article =
        response.data.find(

          item =>

            item._id === id

        )

      if(article){

        setTitle(article.title || '')

        setSlug(article.slug || '')

        setExcerpt(article.excerpt || '')

        setImageUrl(article.imageUrl || '')

        setStatus(article.status || 'Draft')

        setBody(article.body || '')

        setTags(
        article.tags?.join(',') || ''
        )

        setAuthorId(
        article.authorId || ''
        )

      }
    }

  fetchArticle()

}, [id])

  
  const handleUpdate =
  async (e) => {

    e.preventDefault()

    try {

      await api.put(

        `/articles/${id}`,

        {

          title,
          slug,
          excerpt,
          imageUrl,
          body,

          status,

          tags:
          tags.split(',')

        }

      )

      alert(
        'Article Updated'
      )

      navigate(
        '/admin/articles'
      )

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <AdminLayout>

      <h1>
        Edit Article
      </h1>

      <form
        className="article-form"
        onSubmit={
          handleUpdate
        }
      >

        <input

          type="text"

          placeholder="Article Title"

          value={title}

          onChange={(e)=>

            setTitle(
              e.target.value
            )

          }

        />

        <input

          type="text"

          placeholder="Slug"

          value={slug}

          onChange={(e)=>

            setSlug(
              e.target.value
            )

          }

        />

        <textarea

          placeholder="Short Description"

          value={excerpt}

          onChange={(e)=>

            setExcerpt(
              e.target.value
            )

          }

        />

        <input

          type="text"

          placeholder="Featured Image URL"

          value={imageUrl || ''}

          onChange={(e) =>

          setImageUrl(
              e.target.value
          )

         }

        />

        <input

          type="text"

          placeholder="Tags (React, Node, MongoDB)"

          value={tags || ''}

          onChange={(e) =>

              setTags(
                  e.target.value
              )
          }

        />

        <select

           value={authorId || ''}

          onChange={(e)=>

            setAuthorId(
              e.target.value
            )

          }

        >

          <option value="">
            Select Author
          </option>

          {

            authors?.map(

              author => (

                <option

                  key={
                    author._id
                  }

                  value={
                    author._id
                  }

                >

                  {author.name}

                </option>

              )
            )
          }

        </select>

        <select

          value={status || 'Draft'}

          onChange={(e)=>

            setStatus(
              e.target.value
            )

          }

        >

          <option>
            Draft
          </option>

          <option>
            Published
          </option>

        </select>

        <div
          data-color-mode="light"
        >

          <MDEditor

            value={body || ''}

            onChange={(value) =>

                setBody(value || '')
            }

            height={500}

          />

        </div>

        <button
          type="submit"
        >

          Update Article

        </button>

      </form>

    </AdminLayout>

  )
}

export default AdminEditArticle
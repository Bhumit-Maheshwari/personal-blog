import {
  useEffect,
  useState
} from 'react'

import {
  Link
} from 'react-router-dom'

import api
from '../../api/api'

import AdminLayout
from '../../components/admin/AdminLayout'

import './AdminArticles.css'

function AdminArticles() {

  const [articles, setArticles] =
    useState([])

  const [search, setSearch] =
    useState('')

  const [status, setStatus] =
    useState('All')

  useEffect(() => {

    fetchArticles()

  }, [])

  const fetchArticles =
    async () => {

      try {

        const response =
          await api.get(
            '/articles'
          )

        setArticles(
          response.data
        )

      } catch (error) {

        console.log(error)
      }
    }

  const deleteArticle =
    async (id) => {

      const confirmDelete =
          window.confirm('Are you sure you want to delete this article?')

      if (!confirmDelete)
      return

      try {

        await api.delete(
            `/articles/${id}`
        )

        fetchArticles()

      } catch (error) {

            console.log(error)
      }
    }

  const filteredArticles =
    articles.filter(

      article => {

        const matchesSearch =

          article.title
          .toLowerCase()

          .includes(

            search.toLowerCase()
          )

        const matchesStatus =

          status === 'All'

          ||

          article.status ===
          status

        return (
          matchesSearch
          &&
          matchesStatus
        )
      }
    )

  return (

    <AdminLayout>

      <div
        className="articles-header"
      >

        <h1>
          Manage Articles
        </h1>

        <Link
          to="/admin/articles/new"
          className="new-btn"
        >

          + New Article

        </Link>

      </div>

      <div
        className="filter-bar"
      >

        <input

          type="text"

          placeholder="Search article..."

          value={search}

          onChange={(e)=>

            setSearch(
              e.target.value
            )

          }

        />

        <select

          value={status}

          onChange={(e)=>

            setStatus(
              e.target.value
            )

          }

        >

          <option>
            All
          </option>

          <option>
            Published
          </option>

          <option>
            Draft
          </option>

        </select>

      </div>

      <table
        className="article-table"
      >

        <thead>

          <tr>

            <th>
              Title
            </th>

            <th>
              Slug
            </th>

            <th>
              Status
            </th>

            <th>
              Tags
            </th>

            <th>
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {

            filteredArticles.map(

              article => (

                <tr
                  key={
                    article._id
                  }
                >

                  <td>
                    {article.title}
                  </td>

                  <td>
                    {article.slug}
                  </td>

                  <td>
                    {article.status}
                  </td>

                  <td>

                    {
                      article.tags?.join(
                        ', '
                      )
                    }

                  </td>

                  <td>

                    <Link

                      className="action-btn"

                      to={`/article/${article.slug}`}

                    >

                      View

                    </Link>

                    <Link

                      className="action-btn edit"

                      to={`/admin/articles/${article._id}/edit`}

                    >

                      Edit

                    </Link>

                    <button

                      className="action-btn delete"

                      onClick={()=>

                        deleteArticle(
                          article._id
                        )

                      }

                    >

                      Delete

                    </button>

                  </td>

                </tr>

              )
            )
          }

        </tbody>

      </table>

    </AdminLayout>

  )
}

export default AdminArticles
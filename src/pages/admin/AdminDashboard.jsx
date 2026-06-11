import { useEffect, useState } from 'react'

import api from '../../api/api'

import AdminLayout
from '../../components/admin/AdminLayout'

import './AdminDashboard.css'

function AdminDashboard() {

  const [articles, setArticles] =
    useState([])

  const [authors, setAuthors] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const fetchDashboardData =
      async () => {

        try {

          const articleResponse =
            await api.get(
              '/articles'
            )

          const authorResponse =
            await api.get(
              '/authors'
            )

          setArticles(
            articleResponse.data
          )

          setAuthors(
            authorResponse.data
          )

          setLoading(false)

        } catch (error) {

          console.log(error)

          setLoading(false)

        }
      }

    fetchDashboardData()

  }, [])

  if (loading) {

    return (

      <AdminLayout>

        <h2>
          Loading Dashboard...
        </h2>

      </AdminLayout>

    )
  }

  return (

    <AdminLayout>

      <div
        className="dashboard-header"
      >

        <h1>
          Dashboard Overview
        </h1>

        <p>
          Welcome back to the
          Personal Blog Admin Panel
        </p>

      </div>

      <div
        className="dashboard-cards"
      >

        <div
          className="card"
        >

          <h3>
            Total Articles
          </h3>

          <p>
            {articles.length}
          </p>

        </div>

        <div
          className="card"
        >

          <h3>
            Total Authors
          </h3>

          <p>
            {authors.length}
          </p>

        </div>

        <div
          className="card"
        >

          <h3>
            Recent Posts
          </h3>

          <p>
            {
              articles.slice(0, 5)
                .length
            }
          </p>

        </div>

      </div>

      <div
        className="recent-section"
      >

        <h2>
          Recent Articles
        </h2>

        {

          articles
            .slice(0, 5)
            .map(

              article => (

                <div

                  key={
                    article._id
                  }

                  className="recent-card"

                >

                  <h3>

                    {
                      article.title
                    }

                  </h3>

                  <p>

                    Slug:
                    {' '}
                    {
                      article.slug
                    }

                  </p>

                  <div>

                    {

                      article.tags?.map(

                        (
                          tag,
                          index
                        ) => (

                          <span

                            key={index}

                            className="tag"

                          >

                            {tag}

                          </span>

                        )
                      )
                    }

                  </div>

                </div>

              )
            )
        }

      </div>

      <div
        className="recent-section"
      >

        <h2>
          Authors
        </h2>

        {

          authors.map(

            author => (

              <div

                key={
                  author._id
                }

                className="recent-card"

              >

                <h3>
                  {author.name}
                </h3>

                <p>
                  {author.bio}
                </p>

              </div>

            )
          )
        }

      </div>

    </AdminLayout>

  )
}

export default AdminDashboard
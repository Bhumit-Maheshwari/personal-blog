import {
  useEffect,
  useState
} from 'react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts'

import api
from '../../api/api'

import AdminLayout
from '../../components/admin/AdminLayout'

import './AdminStats.css'

function AdminStats() {

  const [analytics, setAnalytics] =
    useState([])

  useEffect(() => {

    const fetchAnalytics =
      async () => {

        try {

          const response =
            await api.get(
              '/analytics/articles'
            )

          setAnalytics(
            response.data
          )

        } catch (error) {

          console.log(error)
        }
      }

    fetchAnalytics()

  }, [])

  const totalViews =
    analytics.reduce(

      (sum, item) =>

        sum + item.views,

      0
    )

  return (

    <AdminLayout>

      <div className="stats-page">

        <h1>
          Analytics Dashboard
        </h1>

        <div className="stats-cards">

          <div className="stats-card">

            <h3>
              Total Views
            </h3>

            <p>
              {totalViews}
            </p>

          </div>

          <div className="stats-card">

            <h3>
              Articles Viewed
            </h3>

            <p>
              {analytics.length}
            </p>

          </div>

        </div>

        <div className="chart-box">

          <h2>
            Article Views
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart
              data={analytics}
            >

              <XAxis
                dataKey="article_id"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="views"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div className="chart-box">

          <h2>
            Views Trend
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <LineChart
              data={analytics}
            >

              <CartesianGrid />

              <XAxis
                dataKey="view_day"
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="views"
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

    </AdminLayout>
  )
}

export default AdminStats
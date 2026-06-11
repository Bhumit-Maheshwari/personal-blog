const express = require('express')

const cors = require('cors')

const dotenv = require('dotenv')

const connectDB = require('./config/db')

const articleRoutes =
  require('./routes/articleRoutes')

const authorRoutes =
  require('./routes/authorRoutes')

const authRoutes =
require('./routes/authRoutes')

dotenv.config()

connectDB()

const app = express()

app.use(cors())

app.use(express.json())

app.use(
  '/api/articles',
  articleRoutes
)

app.use(
  '/api/authors',
  authorRoutes
)

app.get('/', (req, res) => {

  res.send('Backend Server Running')

})

const PORT =
  process.env.PORT || 5000

const analyticsRoutes =
require(
'./routes/analyticsRoutes'
)

app.use(
  '/api',
  analyticsRoutes
)

app.use(
 '/api/auth',
 authRoutes
)

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  )

})

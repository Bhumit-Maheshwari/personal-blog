const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

const articleRoutes = require('./routes/articleRoutes')
const authorRoutes = require('./routes/authorRoutes')
const authRoutes = require('./routes/authRoutes')
const analyticsRoutes = require('./routes/analyticsRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

// Load environment variables before anything else
dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Route mounting
app.use('/api/articles', articleRoutes)
app.use('/api/authors', authorRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/upload', uploadRoutes)

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Backend Server Running')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Global error handler — catches unhandled errors from all routes
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack)
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  })
})

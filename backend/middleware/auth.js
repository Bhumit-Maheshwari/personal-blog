const jwt = require('jsonwebtoken')

/**
 * JWT Authentication Middleware
 * Verifies the Bearer token from the Authorization header.
 * On success, attaches decoded user payload to req.user and calls next().
 * On failure, responds with 401 Unauthorized.
 */
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = authMiddleware

const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

/**
 * Admin Login Controller
 * Validates email/password using bcrypt, checks admin role,
 * and returns a signed JWT token on success.
 */
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find the user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        message: 'User not found'
      })
    }

    // Compare submitted password against the stored bcrypt hash
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({
        message: 'Invalid password'
      })
    }

    // Only allow admin users to log in through this endpoint
    if (user.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied'
      })
    }

    // Sign a JWT valid for 1 day
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    )

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({
      message: 'Login failed',
      error: error.message
    })
  }
}

module.exports = {
  adminLogin
}
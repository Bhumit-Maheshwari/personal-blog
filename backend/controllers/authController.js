const User = require('../models/User')
const jwt = require('jsonwebtoken')

const adminLogin = async (req, res) => {

  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(401).json({
      message: 'User not found'
    })
  }

  if (user.password !== password) {
    return res.status(401).json({
      message: 'Invalid password'
    })
  }

  if (user.role !== 'admin') {
    return res.status(403).json({
      message: 'Access denied'
    })
  }

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
    user
  })
}

module.exports = {
  adminLogin
}
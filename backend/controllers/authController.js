const jwt =
require('jsonwebtoken')

const User =
require('../models/User')

const adminLogin =
async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body

    const user =
      await User.findOne({
        email
      })

    if (!user) {

      return res.status(401).json({

        message:
        'Invalid credentials'

      })
    }

    if (
      user.password !== password
    ) {

      return res.status(401).json({

        message:
        'Invalid credentials'

      })
    }

    if (
      user.role !== 'admin'
    ) {

      return res.status(403).json({

        message:
        'Access denied'
      })
    }

    const token =
      jwt.sign(

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

        id:
        user._id,

        email:
        user.email,

        role:
        user.role
      }

    })

  } catch (error) {

    res.status(500).json({

      message:
      error.message

    })
  }
}

module.exports = {

  adminLogin

}
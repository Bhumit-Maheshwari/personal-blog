import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../api/api'

import './Admin.css'

function Admin() {

  const navigate = useNavigate()
  
  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')
    

  const [error, setError] =
    useState('')

  const handleLogin = async (e) => {

    e.preventDefault()

      try {

        const response = await api.post(
          '/auth/admin-login',
        {
            email,
            password
        }
        )

        localStorage.setItem(
        'token',
        response.data.token
        )

        alert('Login Success')

        navigate('/admin/dashboard')

      } catch (error) {

          setError(
          'Invalid Credentials'
          )
      }
  }

  return (

  <div
    className="admin-container"
  >
    

    <h1
      className="admin-title"
    >
      Personal Blog Admin
    </h1>

    <p
      className="admin-subtitle"
    >
      Manage Articles, Authors and Analytics
    </p>

    {
      error &&

      <p
        className="admin-error"
      >
        {error}
      </p>
    }

    <form
      className="admin-form"
      onSubmit={handleLogin}
    >

      <div>

        <label>
          Email Address
        </label>

        <input
          type="email"
          placeholder="admin@personalblog.com"
          value={email}
          onChange={(e)=>
            setEmail(
              e.target.value
            )
          }
        />

      </div>

      <div>

        <label>
          Password
        </label>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }
        />

      </div>

      <button
        className="admin-btn"
        type="submit"
      >

        Login

      </button>

    </form>

    <div
      className="admin-footer"
    >

      Secure JWT Authentication

    </div>

  </div>
)
}

export default Admin
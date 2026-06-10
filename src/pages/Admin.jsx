import api from '../api/api'

import {
  useState
} from 'react'

function Admin() {

  const [email, setEmail] =
    useState('')

  const [
    password,
    setPassword
  ] = useState('')

  const handleLogin =
    async (e) => {

      e.preventDefault()

      try {

        const response =
          await api.post(

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

        alert(
          'Admin Login Successful'
        )

      } catch (error) {

        alert(
          'Login Failed'
        )
      }
    }

  return (

    <div>

      <h1>
        Admin Login
      </h1>

      <form
        onSubmit={
          handleLogin
        }
      >

        <input

          type="email"

          placeholder="Email"

          value={email}

          onChange={(e)=>

            setEmail(
              e.target.value
            )

          }

        />

        <br />

        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e)=>

            setPassword(
              e.target.value
            )

          }

        />

        <br />

        <button
          type="submit"
        >

          Login

        </button>

      </form>

    </div>
  )
}

export default Admin
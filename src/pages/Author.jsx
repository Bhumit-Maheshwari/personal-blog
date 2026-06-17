import api from '../api/api'

import {
  useEffect,
  useState
} from 'react'

import {
  useParams
} from 'react-router-dom'

import LoadingSpinner
from '../components/common/LoadingSpinner'

import SEO
from '../components/common/SEO'

function Author() {

  const { id } = useParams()

  const [author, setAuthor] =
  useState(null)

  const [loading, setLoading] =
  useState(true)

  const [error, setError] =
  useState(null)


  useEffect(() => {

  const fetchAuthor =
    async () => {

      try {

        const response =
          await api.get(
            `/authors/${id}`
          )

        setAuthor(
          response.data
        )

        setLoading(false)

      } catch (error) {

        setError(
          'Failed to load author'
        )

        setLoading(false)
      }
    }

  fetchAuthor()

}, [id])

if (loading) {

  return <LoadingSpinner />
}

if (error) {

  return <h2>{error}</h2>
}


  return (
    <div>

      <SEO

          title="Personal Blog Platform"

          description="Read articles about React, Node, MongoDB and Web Development."

          image="https://your-logo-url.com/logo.png"

          url={window.location.href}
      />


    <img

      src={
        author.avatarUrl
      }

      alt={
        author.name
      }

      width="150"

    />

    <h1>
      {author.name}
    </h1>

    <p>
      {author.bio}
    </p>

  </div>

    
  )
}

export default Author
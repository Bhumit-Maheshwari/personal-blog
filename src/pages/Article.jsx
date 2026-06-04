/* import axios from 'axios'

import {
  useEffect,
  useState
} from 'react'

import { useParams } from 'react-router-dom'

import ReactMarkdown from 'react-markdown'

import articles from '../data/articles'

import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import Heading from '../components/ui/Heading'

import comments from '../data/comments'

import CommentList from '../components/CommentList'

import CommentForm from '../components/CommentForm'

function Article() {

  const { slug } = useParams()

  const article =
    articles.find(
      (item) => item.slug === slug
    )

  if (!article) {

    return (
      <h1>
        Article Not Found
      </h1>
    )
  }

  const [article, setArticle] =
  useState(null)

  useEffect(() => {

  const fetchArticle =
    async () => {

      try {

        const response =
          await axios.get(

            `http://localhost:5000/api/articles/${slug}`
          )

        setArticle(
          response.data
        )

      } catch (error) {

        console.log(error)
      }
    }

  fetchArticle()

}, [slug])

z
  return (

    <Container>

      <div className="page">

        <Heading>
          {article.title}
        </Heading>

        <Card>
          <div className="markdown-content">

              <ReactMarkdown>
                  {article.content}
              </ReactMarkdown>

          </div>

          <ReactMarkdown>

            {article.content}

          </ReactMarkdown>

        </Card>
        <br />

        <CommentList
            comments={comments}
        />

        <CommentForm />

      </div>

    </Container>
  )
}

export default Article */

//import axios from 'axios'
import api from '../api/api'

import LoadingSpinner
from '../components/common/LoadingSpinner'

import {
  useEffect,
  useState
} from 'react'

import {
  useParams
} from 'react-router-dom'

import ReactMarkdown
  from 'react-markdown'

function Article() {

  //this is loading state to show loading spinner while fetching data
  const [loading, setLoading] =
    useState(true)

  //this is error state to show error message if fetching data fails
  const [error, setError] =
  useState(null)

  const { slug } =
    useParams()

  const [article, setArticle] =
    useState(null)

  useEffect(() => {

    const fetchArticle =
      async () => {

        try {

          const response =
           /*  await axios.get(

              `http://localhost:5000/api/articles/${slug}`
            ) */
                await api.get(
                 `/articles/${slug}`)
                 
          console.log(
            response.data
          )

          setArticle(
            response.data
          )

          setLoading(false)

        } catch (error) {

          console.log(error)

          setLoading(false)

          setError('Failed to load article')
        }
      }

    fetchArticle()

  }, [slug])

  if (!article) {

    return (
      <h1
        style={{
          padding: '40px'
        }}
      >
        Loading...
      </h1>
    )
  }

  if (loading) {

  return <LoadingSpinner />
}

if (error) {

 return (

  <h2>

   {error}

  </h2>
 )
}
  return (

    <div
      style={{
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto'
      }}
    >

      <h1>
        {article.title}
      </h1>

      <p>
        <strong>
          Slug:
        </strong>

        {article.slug}
      </p>

      <div
        style={{
          marginTop: '30px'
        }}
      >

        <ReactMarkdown>

          {article.body}

        </ReactMarkdown>

      </div>

      <div
        style={{
          marginTop: '30px'
        }}
      >

        <h3>
          Tags
        </h3>

        {
          article.tags?.map(

            (tag, index) => (

              <span

                key={index}

                style={{
                  padding:
                    '6px 12px',

                  background:
                    '#2563eb',

                  color: 'white',

                  marginRight: '10px',

                  borderRadius: '5px'
                }}
              >

                {tag}

              </span>
            )
          )
        }

      </div>

    </div>
  )
}

export default Article
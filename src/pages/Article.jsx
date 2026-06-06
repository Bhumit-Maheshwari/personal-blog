import {
  Link
} from 'react-router-dom'

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

  //this is slug from url params to fetch the article
  const { slug } =
    useParams()

  //this is comments state to store comments of the article
  const [comments, setComments] =
  useState([])

  //this is name state to store name of the commenter
  const [name, setName] =
  useState('')

  //this is comment state to store comment text
  const [message, setMessage] =
  useState('')

  const [
  relatedArticles,
  setRelatedArticles
] = useState([])


  //this is article state to store the fetched article
  const [article, setArticle] =
    useState(null)

  //this useEffect will run when the component mounts and fetch the article data from the server
  useEffect(() => {

    const fetchArticle =
      async () => {

        try {

          const response =
           
                await api.get(
                 `/articles/${slug}`)
                 
          console.log(
            response.data
          )

          const allArticles =
              await api.get(
                    '/articles'
              )

          const related =
                allArticles.data.filter(

                (item) =>

                  item._id !==
                  response.data._id

                  &&

                  item.tags?.some(

                tag =>

                  response.data.tags?.includes(
                tag
              )

            )
          )

          setRelatedArticles(
          related.slice(0, 3)
        )

          //set comments state with the fetched comments or an empty array if there are no comments
          setComments(
            response.data.comments || []
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

//this function will handle comment submission and post the comment to the server, then fetch the updated comments and update the comments state
const handleCommentSubmit =
  async (e) => {

    e.preventDefault()

    try {

      await api.post(

        `/articles/${article._id}/comments`,

        {
          name,
          message
        }

      )

      const updatedArticle =
        await api.get(

          `/articles/${slug}`
        )

      setComments(
        updatedArticle.data.comments
      )

      setName('')
      setMessage('')

    } catch (error) {

      console.log(error)
    }
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

    
      <h2>
          Comments
      </h2>
      {
          comments.map(

              (comment) => (

          <div
            key={comment._id}
          >

            <strong>
              {comment.name}
            </strong>

            <p>
              {comment.message}
            </p>

          </div>

            )
        )
    }


    <form
  onSubmit={
    handleCommentSubmit
  }
>

  <input

    type="text"

    placeholder="Your Name"

    aria-label="Commenter Name"

    value={name}

    onChange={(e) =>
      setName(
        e.target.value
      )
    }

  />

  <br />

  <textarea

    placeholder="Comment"

    aria-label="Comment Message"

    value={message}

    onChange={(e) =>
      setMessage(
        e.target.value
      )
    }

  />

  <br />

  <button
    type="submit"

    aria-label="Submit Comment"
  >

    Add Comment

  </button>

</form>

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

      <div
          style={{
          marginTop: '40px'
          }}
      >

      <h2>
          Related Articles
      </h2>

      {
          relatedArticles.map(

            (item) => (

            <div
                key={item._id}
                style={{
                padding: '10px',
                marginBottom: '10px',
                border:
                '1px solid #ddd',
                borderRadius: '8px'
              }}
            >

              <Link
                  to={`/article/${item.slug}`}

                  aria-label={`Read related article ${item.title}`}
              >
                  {item.title}
              </Link>

            </div>

          )
        )
      }

      </div>

    </div>
  )
}

export default Article
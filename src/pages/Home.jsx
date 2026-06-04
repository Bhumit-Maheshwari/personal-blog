import api from '../api/api'

import {
  useEffect,
  useState
} from 'react'

import LoadingSpinner
from '../components/common/LoadingSpinner'

import EmptyState
from '../components/common/EmptyState'

import {
  useSearchParams
}
from 'react-router-dom'

function Home() {

  //this is loading state to show loading spinner while fetching data
  const [loading, setLoading] =
  useState(true)

  //this is error state to show error message if fetching data fails
  const [error, setError] =
  useState(null)

  //this is current page state for pagination
  const [currentPage, setCurrentPage] =
  useState(1)

  const articlesPerPage = 6

  //this is the state for search parameters in the URL
  const [
  searchParams,
  setSearchParams
  ] = useSearchParams()

  //this is the state for the articles
  const [articles, setArticles] =
    useState([])

  useEffect(() => {

    //this function fetches articles from the backend API
    const fetchArticles =
      async () => {

        try {

          //using the api instance we created with axios to make the request    
          const response =
            await api.get('/articles')
            
          console.log(response.data)

          setArticles(response.data)

          setLoading(false)

        } catch (error) {

          console.log(error)

          setLoading(false)

          setError('Failed to load articles')
        }
      }

    fetchArticles()

  }, [])

//this is the selected tag from the search parameters, we can use this to filter articles based on the tag
const selectedTag =
  searchParams.get('tag') || ''

// Pagination Logic
const filteredArticles =
  selectedTag

    ? articles.filter(

        (article) =>

          article.tags?.includes(
            selectedTag
          )

      )

    : articles


const indexOfLastArticle =
  currentPage * articlesPerPage

const indexOfFirstArticle =
  indexOfLastArticle - articlesPerPage

const currentArticles =
  articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  )

const totalPages =
  Math.ceil(
    articles.length /
    articlesPerPage
  )


  if (loading) {
  return <LoadingSpinner />
  }

  if (articles.length === 0) 
  {
    return <EmptyState />
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
        padding: '40px'
      }}
    >

      <h1>
        Blog Articles
      </h1>

        <div
            style={{
            marginBottom: '20px'
          }}
        >

        <button
            onClick={() =>
            setSearchParams({})
          }
        >
            All
        </button>

        <button
              onClick={() =>
              setSearchParams({
              tag: 'React'
            })
          }
        >
            React
        </button>

        <button
              onClick={() =>
              setSearchParams({
              tag: 'Node'
              })
            }
          >
            Node
        </button>

        <button
              onClick={() =>
              setSearchParams({
              tag: 'MongoDB'
            })
          }
        >
          MongoDB
        </button>

      </div>

      {
        currentArticles.map((article) =>  (

          <div
            key={article._id}

            style={{
              border:
                '1px solid gray',

              padding: '20px',

              marginBottom: '20px'
            }}
          >

            <h2>
              {article.title}
            </h2>

            <p>
              {article.slug}
            </p>

          </div>
        ))
      }

      
      <div
         style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '30px'
      }}
      >

      {Array.from(
        { length: totalPages },
            (_, index) => (

      <button

        key={index}

        onClick={() =>
          setCurrentPage(index + 1)
        }

      >

        {index + 1}

      </button>

      )
      )}

      </div>

    </div>
  )
}

export default Home
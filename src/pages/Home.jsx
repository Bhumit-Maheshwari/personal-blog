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

import Hero
from '../components/home/Hero'

import FeaturedArticles
from '../components/home/FeaturedArticles'

import Categories
from '../components/home/Categories'

import TopAuthors
from '../components/home/TopAuthors'

import Newsletter
from '../components/home/Newsletter'

import Footer
from '../components/home/Footer'

import SEO
from '../components/common/SEO'

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
  filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  )

const totalPages =
  Math.ceil(
    filteredArticles.length /
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

      <SEO

          title="Personal Blog Platform"

          description="Read articles about React, Node, MongoDB and Web Development."

          image="https://your-logo-url.com/logo.png"

          url={window.location.href}
      />

      <Hero />

      <FeaturedArticles />

      <Categories />

      <TopAuthors />

      <Newsletter />
      
      <h1>
        Blog Articles
      </h1>

      <input
          type="text"

          placeholder="Search articles..."

          aria-label="Search articles"

          style={{
                  width: '100%',
                  maxWidth: '500px',
                  padding: '10px',
                  marginBottom: '20px',
                  border: '1px solid #ccc',
                  borderRadius: '5px'
          }}
        />

        <div
            style={{
            marginBottom: '20px'
          }}
        >

        <button
          aria-label="Show all articles"

          onClick={() =>
            setSearchParams({})
            }
        >
          All
        </button>

        <button
            aria-label="Filter React articles"

            onClick={() =>
              setSearchParams({
              tag: 'React'
              })
            }
        >
          React
        </button>
        

        <button
            aria-label="Filter Node articles"

              onClick={() =>
              setSearchParams({
              tag: 'Node'
              })
            }
          >
            Node
          </button>

        <button
            aria-label="Filter MongoDB articles"

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

        aria-label={`Go to page ${index + 1}`}

        onClick={() =>
          setCurrentPage(index + 1)
        }

      >

        {index + 1}

      </button>

      )
      )}

      </div>

      <Footer />

    </div>
  )
}

export default Home
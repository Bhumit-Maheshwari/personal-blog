/* import axios from 'axios'

import {
  useEffect,
  useState
} from 'react'

//import { useState } from 'react'

//import articlesData from '../data/articles'

import Container from '../components/ui/Container'
import Heading from '../components/ui/Heading'
import Input from '../components/ui/Input'
import ThemeToggle from '../components/ui/ThemeToggle'

import ArticleList from '../components/ArticleList'

function Home() {

  const [search, setSearch] = useState('')

  const [selectedTag, setSelectedTag] =
  useState('All')

  const tags = [
    'All',
    'React',
    'JavaScript',
    'CSS',
    'Node'
  ]

  const filteredArticles =
    articlesData.filter((article) => {

      const matchesSearch =
        article.title
         .toLowerCase()
         .includes(search.toLowerCase())

      const matchesTag =
        selectedTag === 'All'
          ? true
          : article.tag === selectedTag

      return matchesSearch && matchesTag
    })

    const [articles, setArticles] =
  useState([])

  useEffect(() => {

  const fetchArticles =
    async () => {

      try {

        const response =
          await axios.get(
            'http://localhost:5000/api/articles'
          )

        setArticles(
          response.data
        )

      } catch (error) {

        console.log(error)
      }
    }

  fetchArticles()

}, [])


  return (

    <Container>

      <div className="page">

        <ThemeToggle />

        <Heading>
          Blog Articles
        </Heading>

        <br />

        <Input
          placeholder="Search articles..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <br />
        <br />

        {
          tags.map((tag) => (

            <button
              key={tag}
              onClick={() =>
                setSelectedTag(tag)
              }
             style={{

              marginRight: '10px',

              marginBottom: '10px',

              padding: '10px 18px',

              borderRadius: '8px',

              border: 'none',

              background:
                selectedTag === tag
                ? 'var(--color-primary)'
                : 'var(--color-surface)',

              color:
              selectedTag === tag
              ? 'white'
              : 'var(--color-text-primary)',

              cursor: 'pointer'
          }}
            >

              {tag}

            </button>

          ))
        }

        <br />
        <br />

        <ArticleList
          articles={filteredArticles}
        />

      </div>

    </Container>
  )
}

export default Home */

//import axios from 'axios'
import api from '../api/api'
import {
  useEffect,
  useState
} from 'react'

function Home() {

  const [articles, setArticles] =
    useState([])

  useEffect(() => {

    const fetchArticles =
      async () => {

        try {

          /* const response =
            await axios.get(
              'http://localhost:5000/api/articles'
            ) */

          const response =
            await api.get('/articles')
            
          console.log(response.data)

          setArticles(
            response.data
          )

        } catch (error) {

          console.log(error)
        }
      }

    fetchArticles()

  }, [])

  return (

    <div
      style={{
        padding: '40px'
      }}
    >

      <h1>
        Blog Articles
      </h1>

      {
        articles.map((article) => (

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

    </div>
  )
}

export default Home
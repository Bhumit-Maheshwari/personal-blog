import { useState } from 'react'

import articlesData from '../data/articles'

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
                padding: '10px',
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

export default Home
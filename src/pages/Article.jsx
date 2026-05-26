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

export default Article
import { Link } from 'react-router-dom'

import Card from './Card'
import Button from './Button'

function ArticleCard({ article }) {

  return (

    <Card>

      <div>

        <span
          style={{
            color: 'var(--color-primary)',
            fontWeight: '600'
          }}
        >
          {article.tag}
        </span>

        <br />
        <br />

        <h2>
          {article.title}
        </h2>

        <p>
          {article.description}
        </p>

        <br />

        <Link
          to={`/article/${article.slug}`}
        >

          <Button>
            Read More
          </Button>

        </Link>

      </div>

    </Card>
  )
}

export default ArticleCard
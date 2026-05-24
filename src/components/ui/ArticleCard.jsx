import Card from './Card'
import Button from './Button'
import { Link } from 'react-router-dom'

function ArticleCard({ article }) {

  return (

    <Card>

      <h2>
        {article.title}
      </h2>

      <p>
        {article.description}
      </p>

      <br />

      <strong>
        Tag:
      </strong>

      {article.tag}

      <br />
      <br />
      <Link to={`/article/${article.slug}`}>

        <Button>
          Read More
        </Button>

      </Link>

    </Card>

  )
}

export default ArticleCard
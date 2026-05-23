import Card from './Card'
import Button from './Button'

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

      <Button>
        Read More
      </Button>

    </Card>

  )
}

export default ArticleCard
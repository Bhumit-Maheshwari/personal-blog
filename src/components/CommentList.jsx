import Card from './ui/Card'

function CommentList({ comments }) {

  return (

    <div>

      <h2>
        Comments
      </h2>

      {
        comments.map((comment) => (

          <Card key={comment.id}>

            <h3>
              {comment.name}
            </h3>

            <p>
              {comment.text}
            </p>

          </Card>

        ))
      }

    </div>
  )
}

export default CommentList
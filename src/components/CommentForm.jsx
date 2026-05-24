import Input from './ui/Input'
import Button from './ui/Button'

function CommentForm() {

  return (

    <div
      style={{
        marginTop: '30px'
      }}
    >

      <h2>
        Add Comment
      </h2>

      <br />

      <Input
        placeholder="Your Name"
      />

      <br />

      <textarea

        placeholder="Write your comment..."

        style={{
          width: '100%',
          height: '120px',
          marginTop: '10px',
          padding: '12px',
          borderRadius: '12px'
        }}
      />

      <br />
      <br />

      <Button>
        Submit Comment
      </Button>

    </div>
  )
}

export default CommentForm
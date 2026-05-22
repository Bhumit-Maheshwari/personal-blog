import { useParams } from 'react-router-dom'

function Article() {

  const { slug } = useParams()

  return (
    <div className="page">

      <h1>Article Page</h1>

      <div className="card">

        <h2>Article Slug:</h2>

        <p>{slug}</p>

      </div>

    </div>
  )
}

export default Article
import { useParams } from 'react-router-dom'

function Author() {

  const { id } = useParams()

  return (
    <div className="page">

      <h1>Author Page</h1>

      <div className="card">

        <h2>Author ID:</h2>

        <p>{id}</p>

      </div>

    </div>
  )
}

export default Author
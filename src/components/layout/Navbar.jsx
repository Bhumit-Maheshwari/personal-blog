import { Link } from 'react-router-dom'

function Navbar() {

  return (

    <nav>

      <h2>
        Personal Blog
      </h2>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/article/react-guide">
          Article
        </Link>

        <Link to="/author/bhumit">
          Author
        </Link>

        <Link to="/admin">
          Admin
        </Link>

      </div>

    </nav>

  )
}

export default Navbar
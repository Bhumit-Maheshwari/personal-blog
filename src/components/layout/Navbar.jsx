import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>

      <Link to="/">Home</Link>

      <Link to="/article/react-guide">
        Article
      </Link>

      <Link to="/author/bhumit">
        Author
      </Link>

      <Link to="/admin">
        Admin
      </Link>

    </nav>
  )
}

export default Navbar
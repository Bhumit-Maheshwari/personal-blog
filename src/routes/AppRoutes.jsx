import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Navbar from '../components/layout/Navbar'

import Home from '../pages/Home'
import Article from '../pages/Article'
import Author from '../pages/Author'
import Admin from '../pages/Admin'

function AppRoutes() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/article/:slug"
          element={<Article />}
        />

        <Route
          path="/author/:id"
          element={<Author />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default AppRoutes
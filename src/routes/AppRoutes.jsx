import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Navbar from '../components/layout/Navbar'

import Home from '../pages/Home'
import Article from '../pages/Article'
import Author from '../pages/Author'
import Authors from '../pages/Authors'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import Admin from '../pages/Admin'

import AdminDashboard
from '../pages/admin/AdminDashboard'

import AdminArticles
from '../pages/admin/AdminArticles'

import AdminNewArticle
from '../pages/admin/AdminNewArticle'

import AdminEditArticle
from '../pages/admin/AdminEditArticle'

import AdminStats
from '../pages/admin/AdminStats'

import AdminAuthors
from '../pages/admin/AdminAuthors'

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
          path="/authors"
          element={<Authors />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/articles"
          element={<AdminArticles />}
        />

        <Route
          path="/admin/articles/new"
          element={<AdminNewArticle />}
        />

        <Route
          path="/admin/articles/:id/edit"
          element={<AdminEditArticle />}
        />

        <Route
          path="/admin/stats"
          element={<AdminStats />}
        />

        <Route
          path="/admin/authors"
          element={<AdminAuthors />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default AppRoutes
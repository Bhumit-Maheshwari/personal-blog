import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">

          <div className="footer-column">
            <h3 className="footer-brand">✦ Jigyasa</h3>
            <p className="footer-desc">
              A modern technology knowledge platform. Read articles about React, Node.js, MongoDB, and full-stack web development.
            </p>
            <div className="footer-socials">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                GitHub
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                Twitter
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/authors">Authors</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/admin">Admin</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/?tag=React">React</Link></li>
              <li><Link to="/?tag=Node">Node.js</Link></li>
              <li><Link to="/?tag=MongoDB">MongoDB</Link></li>
              <li><Link to="/?tag=JavaScript">JavaScript</Link></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Jigyasa Tech Platform. Built with React & Node.js.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
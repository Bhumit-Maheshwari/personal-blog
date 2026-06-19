import { Link } from 'react-router-dom'
import SEO from '../components/common/SEO'
import '../App.css'

function About() {
  const techStack = [
    { name: 'React', icon: '⚛️', desc: 'Frontend UI library for building interactive interfaces' },
    { name: 'Node.js', icon: '🟢', desc: 'JavaScript runtime for server-side development' },
    { name: 'Express', icon: '🚀', desc: 'Fast, minimal web framework for Node.js' },
    { name: 'MongoDB', icon: '🍃', desc: 'NoSQL document database for flexible data storage' },
    { name: 'Vite', icon: '⚡', desc: 'Next-generation frontend build tool for fast development' },
    { name: 'JWT Auth', icon: '🔐', desc: 'Secure JSON Web Token authentication system' }
  ]

  return (
    <div className="page-container" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <SEO
        title="About — Jigyasa Tech Platform"
        description="Learn about Jigyasa Tech Platform, our mission, tech stack, and team."
        url={window.location.href}
      />

      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{
          display: 'inline-block',
          padding: '8px 20px',
          background: 'var(--color-primary-light)',
          color: 'var(--color-primary)',
          borderRadius: 'var(--radius-full)',
          fontSize: 'var(--text-sm)',
          fontWeight: '600',
          marginBottom: '20px'
        }}>
          About Us
        </span>
        <h1 style={{
          fontSize: 'var(--text-4xl)',
          fontFamily: 'var(--font-heading)',
          color: 'var(--color-text-primary)',
          marginBottom: '16px',
          lineHeight: '1.2'
        }}>
          Welcome to <span style={{ color: 'var(--color-primary)' }}>Jigyasa</span>
        </h1>
        <p style={{
          fontSize: 'var(--text-lg)',
          color: 'var(--color-text-secondary)',
          maxWidth: '650px',
          margin: '0 auto',
          lineHeight: '1.7'
        }}>
          Jigyasa (meaning "curiosity" in Hindi) is a tech knowledge platform dedicated to empowering
          developers with high-quality articles, tutorials, and insights on modern web technologies.
        </p>
      </div>

      {/* Mission Section */}
      <div style={{
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        padding: '40px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '48px'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-2xl)',
          color: 'var(--color-text-primary)',
          marginBottom: '16px'
        }}>
          🎯 Our Mission
        </h2>
        <p style={{
          color: 'var(--color-text-secondary)',
          lineHeight: '1.8',
          fontSize: 'var(--text-md)'
        }}>
          We believe that knowledge should be accessible, practical, and engaging. Jigyasa Tech Platform
          bridges the gap between beginner tutorials and advanced documentation by providing in-depth,
          well-structured articles that help developers at every level grow their skills. From React hooks
          to MongoDB schema design, from CSS layouts to JWT authentication — we cover the full stack.
        </p>
      </div>

      {/* Tech Stack */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-2xl)',
          color: 'var(--color-text-primary)',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          🛠️ Built With
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          {techStack.map((tech) => (
            <div key={tech.name} style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              border: '1px solid var(--color-border)',
              transition: 'var(--transition-base)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = 'var(--shadow-md)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{tech.icon}</div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-text-primary)',
                marginBottom: '6px'
              }}>
                {tech.name}
              </h3>
              <p style={{
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--text-sm)',
                lineHeight: '1.5'
              }}>
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        textAlign: 'center',
        padding: '40px',
        background: 'var(--gradient-primary)',
        borderRadius: 'var(--radius-lg)',
        color: 'white'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-2xl)',
          marginBottom: '12px'
        }}>
          Ready to Start Learning?
        </h2>
        <p style={{ opacity: 0.9, marginBottom: '24px' }}>
          Explore our collection of articles and level up your development skills.
        </p>
        <Link to="/" style={{
          display: 'inline-block',
          padding: '12px 32px',
          background: 'white',
          color: 'var(--color-primary)',
          borderRadius: 'var(--radius-full)',
          fontWeight: '700',
          textDecoration: 'none',
          transition: 'var(--transition-base)'
        }}>
          Browse Articles
        </Link>
      </div>
    </div>
  )
}

export default About

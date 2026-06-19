import './Hero.css'

function Hero() {
  const scrollToArticles = () => {
    const el = document.getElementById('articles-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" aria-label="Hero section">
      <div className="hero-bg-shapes">
        <div className="hero-shape hero-shape-1"></div>
        <div className="hero-shape hero-shape-2"></div>
        <div className="hero-shape hero-shape-3"></div>
      </div>

      <div className="hero-content">
        <span className="hero-badge">
          🚀 Welcome to Jigyasa Tech Platform
        </span>

        <h1 className="hero-title">
          Explore Technology,
          <span className="hero-gradient-text"> Development </span>
          & Innovation
        </h1>

        <p className="hero-subtitle">
          Learn React, Node.js, MongoDB, AI and Full Stack Development
          from industry-focused articles written by experienced developers.
        </p>

        <div className="hero-actions">
          <button className="btn-primary hero-btn" onClick={scrollToArticles}>
            Explore Articles →
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
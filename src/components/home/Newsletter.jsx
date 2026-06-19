import { useState } from 'react'
import './Newsletter.css'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <section className="newsletter" aria-label="Newsletter signup">
      <div className="newsletter-content">
        <h2 className="newsletter-title">Stay Updated</h2>
        <p className="newsletter-desc">
          Get the latest tech articles and development tips delivered to your inbox every week.
        </p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address for newsletter"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="newsletter-input"
            required
          />
          <button type="submit" className="newsletter-btn">
            {subscribed ? '✓ Subscribed!' : 'Subscribe'}
          </button>
        </form>

        {subscribed && (
          <p className="newsletter-success">
            Thanks for subscribing! Check your inbox for confirmation.
          </p>
        )}
      </div>
    </section>
  )
}

export default Newsletter